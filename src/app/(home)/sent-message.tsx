import {useEffect, useRef} from "react";

const SentMessage = ({ message }: { message: string }) => {

    const sentMessageRef = useRef(null);

    useEffect(() => {
        sentMessageRef.current.scrollIntoView({
            behavior: "smooth"
        });

    }, []);

    return (
        <div 
        ref={sentMessageRef}
        className="bg-stone-200 rounded-[1.25rem] rounded-ee-none w-fit self-end py-3 px-4 dark:bg-[hsl(0,0%,23%)] dark:text-white">
            {message}
        </div>
    )
}

export default SentMessage;