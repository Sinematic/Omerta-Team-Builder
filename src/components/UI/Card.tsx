import clsx from "clsx"

type CardProps = { 
    description: string
    image: string
    text: string
    width?: string
    height?: string
    action?: () => void
}


export default function Card({ description, image, text, width, height, action }: CardProps) {

    return (
        <button onClick={action}
        className={clsx(
            "group relative flex flex-col justify-center bg-red-600 overflow-hidden rounded-xl cursor-pointer select-none border-solid border-2 border-[rgb(var(--lightest-gray))]", 
            width || "w-[32vh]",
            height || "h-[54vh]",
            
        )}>
            <img alt={description} src={image} className="w-full h-full object-cover grayscale saturate-0 brightness-75 transition-all duration-300 ease-out 
            group-hover:grayscale-0 group-hover:saturate-100 group-hover:brightness-100" />

            <p className="absolute bottom-3 w-full text-center text-lg font-bold text-[rgb(var(--text))] shadow-lg">
                {text}
            </p>
        </button>
    )
}


