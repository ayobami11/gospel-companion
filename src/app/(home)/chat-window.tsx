"use client"

import {Suspense} from "react";

import { useAppContext } from "@/contexts";

import SentMessage from "@/app/(home)/sent-message";
import ReceivedMessage from "@/app/(home)/received-message";
import ReceivedMessageSkeleton from "@/app/(home)/received-message-skeleton";


export const ChatWindow = () => {

    const { state } = useAppContext();
   
    return (
        <div>
            {
                state.chat.map(({ question, answer }, index) => {

                    return (
                        <div key={`${index}-${question}`} className="flex flex-col gap-4 m-4">
                            <SentMessage message={question} />
                            <Suspense fallback={<ReceivedMessageSkeleton />}>
                                <ReceivedMessage index={index} response={answer.response} references={answer.references} />
                            </Suspense>
                        </div>
                    )
                })
            }

            {state.pendingPrompt.length > 0 ? <SentMessage message={state.pendingPrompt} /> : null}
        </div>
    )
}