"use client"

import { useSearchParams } from "next/navigation";

import { MessageForm } from "@/app/(home)/message-form";
import { ChatWindow } from "@/app/(home)/chat-window";
import { Header } from "@/app/(home)/header";

import { NewChat } from "@/app/(home)/new-chat";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { instance as axios } from "@/lib/axios";
import { useEffect } from "react";

import { useAppContext } from "@/contexts";
import { ActionTypes, KnowledgeBaseValues } from "@/actions";


export const messageFormSchema = z.object({
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

  const searchParams = useSearchParams();
  const inputKnowledgeBase = searchParams.get("knowledge_base") ?? "";

  const validKnowledgeBase = ["e", "j", "s"];

  const initialKnowledgeBase = validKnowledgeBase.includes(inputKnowledgeBase) ? inputKnowledgeBase : "j";

  const { state, dispatch } = useAppContext();

  const form = useForm<z.infer<typeof messageFormSchema>>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      message: "",
      knowledgeBase: initialKnowledgeBase as KnowledgeBaseValues
    },
  });

  const knowledgeBase = form.getValues("knowledgeBase");

  useEffect(() => {

    const createUser = async () => {

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
    }

    const userId = sessionStorage.getItem("gospel-companion-uid");

    if (!userId) {
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

    const getChatHistory = async () => {

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
    }

    const userId = sessionStorage.getItem("gospel-companion-uid");

    if (userId) {
      getChatHistory();
    }

  }, [dispatch, knowledgeBase, state.userId]);




  return (
    <div className="flex flex-col min-h-screen">

      <Header form={form} />

      <main className="flex-1">
        <div className="max-w-[930px] mx-auto flex flex-col min-h-[calc(100vh-68px)]">
          <div className="flex-1">
            {state.chat.length > 0 ? <ChatWindow form={form} /> : <NewChat form={form} />}
          </div>

          <MessageForm form={form} />
        </div>
      </main>
    </div>
  );
}
