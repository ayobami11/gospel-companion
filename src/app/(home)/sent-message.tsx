import { useEffect } from "react";

import { useAppContext } from "@/contexts";

const SentMessage = ({ message }: { message: string }) => {

    const { state } = useAppContext();

    useEffect(() => {
        window.scrollTo({
            top: state.chat.length <= 1 ? 0 : document.body.scrollHeight,
            behavior: "smooth"
        });

    }, [state.chat.length]);

    return (
        <div
            className="bg-stone-200 rounded-[1.25rem] rounded-ee-none w-fit self-end py-3 px-4 dark:bg-[hsl(0,0%,23%)] dark:text-white">
            {message}
        </div>
    )
}

export default SentMessage;