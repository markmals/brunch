import type { ReactNode } from "react"
import { classNames } from "~/utilities/classNames"

export function Card({ className, children }: { className?: string; children: ReactNode }) {
    return (
        <div
            className={classNames(
                className,
                /p-/.test(className ?? "") ||
                    /px-/.test(className ?? "") ||
                    /py-/.test(className ?? "") ||
                    /pl-/.test(className ?? "") ||
                    /pr-/.test(className ?? "") ||
                    /pt-/.test(className ?? "") ||
                    /pb-/.test(className ?? "")
                    ? null
                    : "px-4 py-5 sm:px-6",
                "border border-gray-200 bg-white shadow-sm sm:rounded-lg"
            )}
        >
            {children}
        </div>
    )
}

function stackClasses(className?: string): (string | null)[] {
    return [
        /justify/.test(className ?? "") ? null : "justify-center",
        /items/.test(className ?? "") ? null : "items-center",
        /gap/.test(className ?? "") ? null : "gap-1",
        "flex",
    ]
}

export function VStack({ className, children }: { className?: string; children: ReactNode }) {
    return (
        <div className={classNames(className, ...stackClasses(className), "flex-col")}>
            {children}
        </div>
    )
}

export function HStack({ className, children }: { className?: string; children: ReactNode }) {
    return (
        <div className={classNames(className, ...stackClasses(className), "flex-row")}>
            {children}
        </div>
    )
}
