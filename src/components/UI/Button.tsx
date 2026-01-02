type ButtonType = {
    text : string;
    action: () => void;
    color ?: string;
    specifiedClasses?: string
}

export default function Button({ text, action, color, specifiedClasses } : ButtonType ) {

    return (
        <button onClick={() => action()} className={(color ? color : "bg-emerald-600 text-white") 
        + " px-5 py-3 rounded-lg shadow-lg font-medium cursor-pointer " + specifiedClasses}>
            {text}
        </button>
    )
}
