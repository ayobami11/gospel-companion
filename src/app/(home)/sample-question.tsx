
"use client"

import { Button } from "@/components/ui/button";

import { instance as axios } from "@/lib/axios";

import { ActionTypes, FormType, type RagResponse } from "@/actions";
import { useAppContext } from "@/contexts";

interface SampleQuestionProps {
    form: FormType,
    question: string
}

export const SampleQuestion = ({ form, question }: SampleQuestionProps) => {

    const { state, dispatch } = useAppContext();

    const knowledgeBase = form.getValues("knowledgeBase");

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
    
            })
    
            form.resetField("message");
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