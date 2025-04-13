"use client"

import { useEffect } from "react";

import { useSearchParams, useRouter } from "next/navigation";

import { useFormContext } from "react-hook-form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

const validKnowledgeBaseValues = ["e", "j", "s"];

export const KnowledgeBase = () => {

    const router = useRouter();

    const searchParams = useSearchParams();

    const methods = useFormContext();

    const { setValue, control } = methods;

    // timeout of 0 is necessary to ensure the field is registered before setValue is called
    useEffect(() => {
        const inputKnowledgeBase = searchParams.get("knowledge_base");
        const selectedKnowledgeBase = validKnowledgeBaseValues.includes(inputKnowledgeBase?.toLowerCase() ?? "") ? searchParams.get("knowledge_base") : "j";

        const timeout = setTimeout(() => {
            setValue("knowledgeBase", selectedKnowledgeBase);
        }, 0);

        return () => clearTimeout(timeout);
    }, [searchParams, setValue]);


    return (
        <Form {...methods}>
            <FormField
                control={control}
                name="knowledgeBase"
                render={({ field }) => (
                    <FormItem className="flex-1">
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            <FormControl>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Knowledge base" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem
                                    value="e"
                                    onClick={() => router.push("?knowledge_base=e")}
                                >Elementary</SelectItem>
                                <SelectItem
                                    value="j"
                                    onClick={() => router.push("?knowledge_base=j")}
                                >Junior</SelectItem>
                                <SelectItem
                                    value="s"
                                    onClick={() => router.push("?knowledge_base=s")}
                                >Senior</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </Form>
    );
}