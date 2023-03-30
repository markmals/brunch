import type { ReactNode } from "react"
import { classNames } from "~/utilities/class-names"

export function Card({ className, children }: { className?: string; children: ReactNode }) {
    return (
        <div
            className={classNames(
                className,
                /p(.?)-/.test(className ?? "") ? null : "px-4 py-5 sm:px-6",
                "border border-gray-200 bg-white shadow-sm dark:border-none dark:bg-gray-950 sm:rounded-lg"
            )}
        >
            {children}
        </div>
    )
}
