import clsx from "clsx"

type ButtonType = {
    text : string;
    action: () => void;
    color ?: string;
    textColor?: string;
    specifiedClasses?: string
}

export default function Button({ text, action, color="bg-emerald-600", textColor="text-white", specifiedClasses } : ButtonType ) {

    return (
        <button onClick={action} className={clsx(color, textColor, specifiedClasses,
        "px-5 py-3 rounded-lg shadow-lg font-medium cursor-pointer select-none")}>
            {text}
        </button>
    )
}
