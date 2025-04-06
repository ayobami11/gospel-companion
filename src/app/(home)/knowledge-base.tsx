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
import { FormType } from "@/actions";

interface KnowledgeBaseProps {
    form: FormType
}

export const KnowledgeBase = ({ form }: KnowledgeBaseProps) => {

    return (
        <Form {...form}>
            <FormField
                control={form.control}
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
                                <SelectItem value="e">Elementary</SelectItem>
                                <SelectItem value="j">Junior</SelectItem>
                                <SelectItem value="s">Senior</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </Form>
    );
}