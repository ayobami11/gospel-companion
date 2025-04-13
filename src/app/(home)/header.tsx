import { ModeToggle } from "@/app/(home)/mode-toggle";
import { KnowledgeBase } from "@/app/(home)/knowledge-base";

export const Header = () => {

    return (
        <header className="p-4 fixed top-0 w-full bg-white dark:bg-[hsl(0,0%,12.90%)]">
            <div className="flex flex-col items-center gap-4 md:flex-row">
                <h1 className="font-bold text-[2rem] dark:text-stone-50">Gospel Companion</h1>

                <div className="flex gap-4 w-fit md:ml-auto">
                    <KnowledgeBase />

                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}