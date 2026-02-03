import clsx from "clsx"

type ButtonType = {
    text : string;
    action: () => void;
    color ?: string;
    textColor?: string;
    borderColor?: string
    padding?: string;
    specifiedClasses?: string;
}


export default function Button({ text, action, color, textColor, borderColor, padding, specifiedClasses } : ButtonType ) {


    return (
        <button onClick={action} className={
        clsx(
            color || "bg-[rgb(var(--success))]",
            textColor || "text-[rgb(var(--text))]",
            borderColor || "",
            padding || "px-5 py-3",
            specifiedClasses, 
            "w-fit rounded-lg shadow-lg text-shadow-lg font-medium cursor-pointer select-none"
        )}>
            {text}
        </button>
    )
}
