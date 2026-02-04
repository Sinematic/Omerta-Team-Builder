import { useState } from "react"
import type { AreaType } from "./RestrictedAreasPage"
import clsx from "clsx"


export default function RestrictedElement({ area } : { area: AreaType }) {

    const [isDone, setIsDone] = useState<boolean>(false)


    return (
        <li key={area.name} onClick={() => setIsDone(prev => !prev)} 
        className={clsx("py-2", isDone ? "bg-[rgb(var(--very-dark-green))]" : "bg-[rgb(var(--slate))]")}>
            {area.name}
        </li>
    )
}
