import { useState } from "react"
import clsx from "clsx"
import { type ItemType } from "./CategoryNode"


export default function RestrictedElement({ area } : { area: ItemType }) {

    const [isDone, setIsDone] = useState<boolean>(false)


    return (
        <li onClick={() => setIsDone(prev => !prev)} 
        className={clsx("py-2", isDone ? "bg-[rgb(var(--very-dark-green))]" : "bg-[rgb(var(--slate))]")}>
            {area.name}
        </li>
    )
}
