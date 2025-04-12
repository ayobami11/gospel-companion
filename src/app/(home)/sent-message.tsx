import {useEffect, useRef} from "react";

const SentMessage = ({ message }: { message: string }) => {

    const sentMessageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        sentMessageRef.current?.scrollIntoView({
            block: "end",
            inline: "nearest",
            behavior: "smooth"
        });

    }, []);

    return (
        <div 
        ref={sentMessageRef}
        className="mt-4 bg-stone-200 rounded-[1.25rem] rounded-ee-none w-fit self-end py-3 px-4 dark:bg-[hsl(0,0%,23%)] dark:text-white">
            {message}
        </div>
    )
}

export default SentMessage;