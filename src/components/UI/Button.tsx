import clsx from "clsx"

type ButtonType = {
    text : string;
    action: () => void;
    color ?: string;
    textColor?: string;
    padding?: string;
    specifiedClasses?: string;
}

export default function Button({ text, action, color="bg-emerald-600", textColor="text-white", padding="px-5 py-3", specifiedClasses } : ButtonType ) {

    return (
        <button onClick={action} className={clsx(color, textColor, specifiedClasses, padding,
        "w-fit rounded-lg shadow-lg font-medium cursor-pointer select-none")}>
            {text}
        </button>
    )
}
