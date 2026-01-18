import clsx from "clsx"

type ButtonType = {
    text : string;
    action: () => void;
    color ?: string;
    textColor?: string;
    padding?: string;
    specifiedClasses?: string;
}

export default function Button({ text, action, color, textColor, padding, specifiedClasses } : ButtonType ) {


    return (
        <button onClick={action} className={
        clsx(
            color || "bg-[rgb(var(--success))]",
            textColor || "text-[rgb(var(--text))]",
            padding || "px-5 py-3",
            specifiedClasses, 
            "w-fit rounded-lg shadow-lg font-medium cursor-pointer select-none"
        )}>
            {text}
        </button>
    )
}
