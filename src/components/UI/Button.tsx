import clsx from "clsx"

type ButtonType = {
    text : string
    action: () => void
    color ?: string
    textColor?: string
    borderColor?: string
    specifiedClasses?: string
}


export default function Button({ text, action, color, textColor, borderColor, specifiedClasses } : ButtonType ) {


    return (
        <button onClick={action} type="button" className={clsx(
            color || "bg-[rgb(var(--success))]",
            textColor || "text-[rgb(var(--text))]",
            borderColor || "",
            specifiedClasses, 
            "w-fit p-2 md:px-5 md:py-3 rounded-lg shadow-lg text-shadow-lg font-medium cursor-pointer select-none"
        )}>
            {text}
        </button>
    )
}
