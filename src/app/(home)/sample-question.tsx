
"use client"

import { useState } from "react";

import { useAppContext } from "@/contexts";

import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";

import { instance as axios } from "@/lib/axios";

import { ActionTypes, type RagResponse } from "@/actions";

import { useToast } from "@/hooks/use-toast";

interface SampleQuestionProps {
    question: string
}

export const SampleQuestion = ({ question }: SampleQuestionProps) => {

    const { toast } = useToast();
    const { state, dispatch } = useAppContext();

    const [isLoading, setIsLoading] = useState(false);

    const methods = useFormContext();

    const knowledgeBase = methods.getValues("knowledgeBase");

    const sendSampleQuestion = async () => {

        dispatch({
            type: ActionTypes.SET_PENDING_PROMPT,
            payload: {
                pendingPrompt: question
            }
        });

        dispatch({
            type: ActionTypes.SET_CHAT_VIEW,
            payload: {
                isNewChat: false
            }
        });

        setIsLoading(true);

        try {
            const { data, status } = await axios.post<RagResponse>(
                `/rag-response/${state.userId}?query=${question}&knowledge_base=${knowledgeBase}`
            );

            if (status === 200) {

                dispatch({
                    type: ActionTypes.UPDATE_CHAT,
                    payload: {
                        question,
                        answer: data
                    }

                })

                methods.resetField("message");
            }

        } catch (error) {
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction
                    altText="Try again"
                    onClick={sendSampleQuestion}
                >Try again</ToastAction>
            })

        } finally {
            setIsLoading(false);
        }

    }

    return (
        <Button
            variant="outline"
            className="p-2.5 rounded-[100px] text-base"
            onClick={sendSampleQuestion}
        >{question}</Button>
    )
}