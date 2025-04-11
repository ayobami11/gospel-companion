import { Skeleton } from "@/components/ui/skeleton";

export const ChatWindowSkeleton = () => {
    return (
        <div>

            <Skeleton className="m-4 h-24 w-full flex-1 rounded-[1.25rem] rounded-ee-none self-end py-3 px-4" />
        </div>
    )
}