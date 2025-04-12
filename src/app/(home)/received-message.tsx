import { BookOpenText, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";

import { TypeAnimation } from "react-type-animation";

import CopyButton from "@/app/(home)/copy-button";

import { References, ActionTypes, RagResponse } from "@/actions";

import { instance as axios } from "@/lib/axios";

import { useState, useEffect } from "react"

import ReactMarkdown from "react-markdown";

import { useFormContext } from "react-hook-form";

interface ReceivedMessageProps {
  index: number,
  response: string,
  references: References[]
}

import { useAppContext } from "@/contexts";

const ReceivedMessage = ({ index, response, references }: ReceivedMessageProps) => {

  const [showMarkdown, setShowMarkdown] = useState(false);

  const methods = useFormContext();

  const { state, dispatch } = useAppContext();

  const regenerateResponse = async () => {

    const knowledgeBase = methods.getValues("knowledgeBase");

    const question = state.chat.at(-1)?.question ?? "";

    try {
      const { data, status } = await axios.post<RagResponse>(
        `/rag-response/${state.userId}?query=${question}&knowledge_base=${knowledgeBase}&regenerate=true`
      );
      if (status === 200) {

        dispatch({
          type: ActionTypes.REGENERATE_RESPONSE,
          payload: {
            question,
            answer: data
          }
        });

        methods.resetField("message");

        setShowMarkdown(false);
      }


    } catch (error) {
      console.error(`Chat Error: ${error}`);
    }

  }

  return (
    <div className="flex gap-5 self-start py-3">
      <div>
        <div>
          {
            !showMarkdown ? (
              <TypeAnimation
                cursor={false}
                splitter={(str) => str.split(/(?= )/)}
                style={{ whiteSpace: "pre-line" }}
                sequence={[
                  response,
                  5000,
                  () => setShowMarkdown(true)
                ]}
                speed={{ type: "keyStrokeDelayInMs", value: 30 }}
                omitDeletionAnimation={true}
              />
            ) : (
              <div className="[&>ol]:list-decimal [&>ol]:list-inside">
                <ReactMarkdown>{response}</ReactMarkdown>
              </div>
            )
          }

        </div>
        <div className="flex gap-4 my-4">
          <CopyButton
            text={response}
            className="rounded-lg shadow-none border border-[hsl(0,0%,92%)] bg-white text-[hsl(0,0%,8%)] hover:bg-white hover:brightness-95 dark:bg-[hsl(0,0%,16%)] dark:text-white dark:border-[hsl(0,0%,18%)]"
          />

          {/* Only the last response can be regenerated */}
          {
            index == state.chat.length - 1 ?
              (
                <Button
                  className="rounded-lg shadow-none border border-[hsl(0,0%,92%)] bg-white text-[hsl(0,0%,8%)] hover:bg-white hover:brightness-95 dark:bg-[hsl(0,0%,16%)] dark:text-white dark:border-[hsl(0,0%,18%)]"
                  onClick={regenerateResponse}
                >
                  <RotateCw />
                  Regenerate
                </Button>

              ) : null
          }
        </div>

        {/* <Separator className="bg-[hsl(0,0%,92%)] dark:bg-[hsl(0,0%,18%)] my-5" /> */}

        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-[hsl(0,0%,54%)]">References</span>
          <div className="flex flex-wrap gap-3 max-w-[780px]">
            {references.map((reference) => {
              return (
                <Button
                  key={reference.topic}
                  variant="outline"
                  asChild
                >
                  <div
                    className="flex items-center gap-2.5 py-0.5 px-2 rounded-lg"
                  >
                    <BookOpenText className="shrink-0" />
                    <div>
                      <a
                        href={reference.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      > {reference.topic}</a>
                    </div>
                  </div>
                </Button>

              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReceivedMessage;