"use client"

import { useAppContext } from "@/contexts";

import SentMessage from "@/app/(home)/sent-message";
import ReceivedMessage from "@/app/(home)/received-message";
import { FormType } from "@/actions";


interface ChatWindowProps {
    form: FormType
}

export const ChatWindow = ({ form }: ChatWindowProps) => {

    const { state } = useAppContext();
   
    return (
        <div>
            {
                state.chat.map(({ question, answer }, index) => {

                    return (
                        <div key={`${index}-${question}`} className="flex flex-col gap-4 m-4">
                            <SentMessage message={question} />
                            <ReceivedMessage form={form} index={index} response={answer.response} references={answer.references} />
                        </div>
                    )
                })
            }
        </div>
    )
}