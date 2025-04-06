import { BookOpenText, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";

import CopyButton from "@/app/(home)/copy-button";

import { References, ActionTypes, RagResponse } from "@/actions";

import { instance as axios } from "@/lib/axios";

import ReactMarkdown from "react-markdown";

import { useFormContext } from "react-hook-form";

interface ReceivedMessageProps {
  index: number,
  response: string,
  references: References[]
}

import { useAppContext } from "@/contexts";

const ReceivedMessage = ({ index, response, references }: ReceivedMessageProps) => {

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

        })

        methods.resetField("message");
        // let referencesString: string = "";
        // references?.map(
        //     ({ topic, link }) => (referencesString += "\n" + topic + "\n" + link)
        //     // (referencesString += [link])
        // );
        //response += "\n" + referencesString;
        //const parsedResponse = { message: response };
        // setAnswers([...answers, [question, parsedResponse]]);
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
    <div className="flex gap-5 self-start py-3">
      <div>
        <div>
          <ReactMarkdown>
            {response}
          </ReactMarkdown>
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
          <div className="space-y-3">
            {references.map((reference) => {
              return (
                <Button
                  key={reference.topic}
                  variant="outline"
                  asChild
                >
                  <div
                    className="flex flex-wrap items-center gap-2.5 py-0.5 px-2 rounded-lg"
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