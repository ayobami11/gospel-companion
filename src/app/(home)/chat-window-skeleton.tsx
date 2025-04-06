import { Skeleton } from "@/components/ui/skeleton";

export const ChatWindowSkeleton = () => {
    return (
        <div className="flex flex-col gap-4 m-4">

            <Skeleton className="h-16 rounded-[1.25rem] rounded-ee-none w-full self-end py-3 px-4" />
            <div className="flex gap-5 py-3">
                <Skeleton className="shrink-0 w-8 h-8 rounded-full" />
                <Skeleton className="h-24 w-full flex-1 rounded-[1.25rem] rounded-ee-none self-end py-3 px-4" />
            </div>

            <Skeleton className="h-16 rounded-[1.25rem] rounded-ee-none w-full self-end py-3 px-4" />
            <div className="flex gap-5 py-3">
                <Skeleton className="shrink-0 w-8 h-8 rounded-full" />
                <Skeleton className="h-24 w-full flex-1 rounded-[1.25rem] rounded-ee-none self-end py-3 px-4" />
            </div>

            <Skeleton className="h-16 rounded-[1.25rem] rounded-ee-none w-full self-end py-3 px-4" />
            <div className="flex gap-5 py-3">
                <Skeleton className="shrink-0 w-8 h-8 rounded-full" />
                <Skeleton className="h-24 w-full flex-1 rounded-[1.25rem] rounded-ee-none self-end py-3 px-4" />
            </div>
            
        </div>
    )
}