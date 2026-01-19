import clsx from "clsx"

type CardProps = { 
    text: string
    image: string
    description?: string
    animated?: boolean
    action?: () => void
    borderColor?: string
}


export default function Card({ text, image, description, animated=false, action, borderColor }: CardProps) {

    return (
        <button onClick={action}className={clsx(
            "group relative flex flex-col justify-center bg-[rgb(var(--warning))] overflow-hidden h-full w-full",
            "rounded-xl cursor-pointer select-none border-solid md:border-3", 
            borderColor || "border-[rgb(var(--lightest-gray))] md:border-[rgb(var(--warning))]",
        )}>
            <img alt={description} src={image} className={clsx("w-full h-full object-cover", 
                animated ? "md:grayscale md:saturate-0 md:brightness-75" : "", 
                "transition-all duration-300 ease-out group-hover:grayscale-0 group-hover:saturate-100 group-hover:brightness-100"
            )} />

            <p className="absolute bottom-0 w-full py-2 text-center text-sm md:text-xl md:font-semibold text-shadow-xl shadow-lg bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
                {text}
            </p>
        </button>
    )
}


