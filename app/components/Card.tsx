import type { ReactNode } from "react"
import { classNames } from "~/utilities/classNames"

export function Card({ className, children }: { className?: string; children: ReactNode }) {
    return (
        <div
            className={classNames(
                // className,
                "border border-gray-200 bg-white px-4 py-5 shadow-sm sm:rounded-lg sm:px-6"
            )}
        >
            <div
                className={classNames(
                    className,
                    /justify/.test(className ?? "") ? null : "justify-center",
                    /items/.test(className ?? "") ? null : "items-center",
                    /flex/.test(className ?? "") ? null : "flex-col",
                    "flex flex-wrap sm:flex-nowrap"
                )}
            >
                {children}
            </div>
        </div>
    )
}
