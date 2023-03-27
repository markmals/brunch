import type { CSSProperties } from "react"

export function Header({ title, image }: { title: string; image: string }) {
    return (
        <div className="h-72 shadow-none sm:h-96 sm:rounded-lg sm:shadow">
            <div
                className="hero flex h-full w-full flex-col justify-start bg-cover px-4 py-5 sm:rounded-lg sm:px-6"
                style={{ "--hero-image": `url('/${image}')` } as CSSProperties}
            >
                <div className="flex flex-col gap-2 rounded bg-[rgba(0,0,0,0.5)] p-4 text-white drop-shadow sm:bg-transparent">
                    <span className="font-sans text-xl">You are invited to</span>
                    <span className="font-serif text-7xl font-black uppercase sm:text-8xl">
                        {title}
                    </span>
                </div>
            </div>
        </div>
    )
}
