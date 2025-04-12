
"use client"

import { Button } from "@/components/ui/button";

import { instance as axios } from "@/lib/axios";

import { ActionTypes, type RagResponse } from "@/actions";
import { useAppContext } from "@/contexts";

import { useFormContext } from "react-hook-form";

interface SampleQuestionProps {
  question: string
}

export const SampleQuestion = ({ question }: SampleQuestionProps) => {

  const { state, dispatch } = useAppContext();

  const methods = useFormContext();

  const knowledgeBase = methods.getValues("knowledgeBase");

  const sendSampleQuestion = async () => {

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

        });

        dispatch({
          type: ActionTypes.SET_CHAT_VIEW,
          payload: {
            isNewChat: false
          }
        })

        methods.resetField("message");
      } else {
        // throw error;
      }
    } catch (error) {
      console.error(`Chat Error: ${error}`);
      // setError(error);
    } finally {
      // setIsLoading(false);
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