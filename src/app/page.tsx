"use client"

import { useEffect, Suspense } from "react";

import { useSearchParams } from "next/navigation";

import { useAppContext } from "@/contexts";

import { FormProvider } from "react-hook-form";

import { MessageForm } from "@/app/(home)/message-form";
import { ChatWindow } from "@/app/(home)/chat-window";
import { Header } from "@/app/(home)/header";

import { NewChat } from "@/app/(home)/new-chat";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { instance as axios } from "@/lib/axios";

import { ActionTypes } from "@/actions"

const validKnowledgeBaseValues = ["e", "j", "s"];
type KnowledgeBaseValues = "e" | "j" | "s";

const messageFormSchema = z.object({
  knowledgeBase: z.enum(["e", "j", "s"], {
    message: "Please select a valid knowledge base.",
  }),
  message: z.string().min(1, {
    message: "Message is required.",
  }).max(1000, {
    message: "Message cannot exceed 1000 characters."
  }).trim()
}).required();

export default function Home() {

  const { state, dispatch } = useAppContext();

  const searchParams = useSearchParams();

    const inputKnowledgeBase = searchParams.get("knowledge_base");
    const selectedKnowledgeBase = validKnowledgeBaseValues.includes(inputKnowledgeBase?.toLowerCase() ?? "") ? searchParams.get("knowledge_base") : "j";

    const methods = useForm<z.infer<typeof messageFormSchema>>({
      resolver: zodResolver(messageFormSchema),
      defaultValues: {
        message: "",
        knowledgeBase: selectedKnowledgeBase as KnowledgeBaseValues
      },
    });

  const knowledgeBase = methods.getValues("knowledgeBase");

  useEffect(() => {

    const userId = sessionStorage.getItem("gospel-companion-uid");

    if (!userId) {

      const createUser = async () => {

        try {
          const { data, status } = await axios.post("/create-user");

          if (status === 200) {
            sessionStorage.setItem("gospel-companion-uid", data);

            dispatch({
              type: ActionTypes.SET_USER_ID,
              payload: {
                userId: data
              }
            })
          }
        } catch (error) {
          console.log(error);
        }
      }

      createUser();

    } else {
      dispatch({
        type: ActionTypes.SET_USER_ID,
        payload: {
          userId
        }
      })
    }

  }, [dispatch, state.userId]);


  useEffect(() => {


    if (state.userId) {

      const getChatHistory = async () => {

        try {

          const { data, status } = await axios.get(`/get-user/${state.userId}`);

          if (status === 200) {

            const { responses, references } = data["full_history"][knowledgeBase];

            const chat = responses.map((response: string[], index: number) => {

              const [question, answer] = response;
              const result = {
                // slices out the text 'Human: ' from the string
                question: question.slice(7),
                answer: {
                  // slices out the text 'AI: ' from the string
                  response: answer.slice(4),
                  references: references[index]
                }
              }

              return result;
            });

            dispatch({
              type: ActionTypes.GET_CHAT_HISTORY,
              payload: {
                chat
              }
            })
          }
        } catch (error) {
          console.log(error);
        }
      }

      getChatHistory();
    }
  }, [dispatch, knowledgeBase, state.userId]);


  return (
    <div className="flex flex-col">
      <FormProvider {...methods}>
        <Header />

        <main className="flex-1 mt-32 md:mt-20">
          <div className="max-w-[930px] mx-auto flex flex-col min-h-[calc(100vh-80px)]">
            <div className="flex-1">
              {state.isNewChat ? <NewChat /> : <ChatWindow />}
            </div>

            <MessageForm />
          </div>
        </main>
      </FormProvider>
    </div>
  );
}
