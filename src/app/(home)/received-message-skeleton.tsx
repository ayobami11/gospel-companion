import { Skeleton } from "@/components/ui/skeleton";

export const ReceivedMessageSkeleton = () => {
    return (
        <div className="flex gap-2">
            <Skeleton className="h-2 w-2 rounded-full bg-neutral-200/30 invert dark:invert-0" />
            <Skeleton className="h-2 w-2 rounded-full bg-neutral-200/30 invert dark:invert-0" />
            <Skeleton className="h-2 w-2 rounded-full bg-neutral-200/30 invert dark:invert-0" />
        </div>
    )
}