"use client"

import { useState } from "react";

import { useAppContext } from "@/contexts";

import { useFormContext } from "react-hook-form";

import { ActionTypes, RagResponse } from "@/actions";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";

import { Send } from "lucide-react";

import { instance as axios } from "@/lib/axios";

import { useToast } from "@/hooks/use-toast";

export const MessageForm = () => {

    const { toast } = useToast();

    const [isLoading, setIsLoading] = useState(false);

    const methods = useFormContext();

    const { state, dispatch } = useAppContext();

    const question = methods.getValues("message");
    const knowledgeBase = methods.getValues("knowledgeBase");

    const clearMessageField = () => {
        dispatch({
            type: ActionTypes.UPDATE_MESSAGE,
            payload: {
                message: ""
            }
        });
    }


    async function onSubmit() {

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
                    onClick={onSubmit}
                >Try again</ToastAction>
            })

        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div className="sticky bottom-0 max-w-[920px] w-full md:left-[calc(50%+310px)] bg-white dark:bg-[hsl(0,0%,12.90%)]">
            <div className="p-2 mx-3 my-0">
                <Form {...methods}>
                    <form
                        id="message-form"
                        method="POST"
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className="flex rounded-2xl"
                    >
                        <FormField
                            control={methods.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl>
                                        <AutosizeTextarea
                                            id="message"
                                            placeholder="Write a message here..."
                                            minHeight={35}
                                            maxHeight={200}
                                            className="flex-1 resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-end ml-3">
                            <Button
                                type="submit"
                                className="rounded-[0.625rem] p-2"
                                disabled={isLoading}
                                onClick={clearMessageField}
                            >
                                <Send />
                                <span className="sr-only">Send message</span>
                            </Button>
                        </div>
                    </form >
                </Form>


                <p className="text-sm text-center pt-2">Responses may lack enough context. Check linked references.</p>
            </div>
        </div>
    )
}