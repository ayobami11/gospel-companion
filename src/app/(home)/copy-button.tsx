import { useState, useEffect } from "react";

import { Copy, Check } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CopyButtonProps extends ButtonProps {
    text: string
}

const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
}

const CopyButton = ({ text, className }: CopyButtonProps) => {

    const [hasCopied, setHasCopied] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setHasCopied(false);
        }, 2000);
    }, [hasCopied]);

    return (

        <Button
            className={cn(className)}
            onClick={() => {
                copyToClipboard(text);
                setHasCopied(true);
            }}
        >
            {hasCopied ? <Check /> : <Copy />}
            <span className="sr-only">Copy to clipboard</span>
        </Button>
    )
}

export default CopyButton