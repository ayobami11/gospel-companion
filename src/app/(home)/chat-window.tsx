"use client"

import {Suspense} from "react";

import { useAppContext } from "@/contexts";

import SentMessage from "@/app/(home)/sent-message";
import ReceivedMessage from "@/app/(home)/received-message";
import { ReceivedMessageSkeleton } from "@/app/(home)/received-message-skeleton";


export const ChatWindow = () => {

    const { state } = useAppContext();
   
    return (
        <div>
            {
                state.chat.map(({ question, answer }, index) => {

                    return (
                        <div key={`${index}-${question}`} className="flex flex-col gap-2.5 m-4">
                            <SentMessage message={question} />
                            <Suspense fallback={<ReceivedMessageSkeleton />}>
                                <ReceivedMessage index={index} response={answer.response} references={answer.references} />
                            </Suspense>
                        </div>
                    )
                })
            }

            {/* flex parent is needed for self-end prop on flex item to work */}
            {state.pendingPrompt.length > 0 ? (
                <div className="flex flex-col gap-5 m-4">
                    <SentMessage message={state.pendingPrompt} />
                    <ReceivedMessageSkeleton />
                </div> 
            ) : null}
        </div>
    )
}