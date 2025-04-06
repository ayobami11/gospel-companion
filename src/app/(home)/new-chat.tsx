"use client"

import { FormType } from "@/actions";
import { SampleQuestion } from "@/app/(home)/sample-question";

interface NewChatProps {
    form: FormType
}

export const NewChat = ({ form }: NewChatProps) => {

    const sampleQuestions = [
        "What is Salvation?",
        '"Enmity between thee and the woman" means what?',
        "Did God forgive Moses for striking the rock?"
    ];   

    return (
        <div className="text-center p-4 min-h-[75vh] flex flex-col justify-center items-center">
            <p className="font-bold text-[2.5rem] mb-2">What would you like to ask?</p>
            <ul className="flex flex-wrap justify-center gap-4">
                {
                    sampleQuestions.map((question, index) => {
                        return (
                            <li key={`sample-question-${index}`}>
                                <SampleQuestion form={form} question={question} />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}