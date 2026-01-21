import { useStats } from "@/hooks/useStats"
import clsx from "clsx"
import { useNavigate } from "react-router"

export default function Rank({ title, range } : { title : string, range : string }) {

    const { data, isLoading } = useStats(title, range)
    console.log(data)
    const navigate = useNavigate()

    let sortedRows

    if (data) sortedRows = [...data].sort((a, b) => b[0] - a[0])


    return (
        <div className="pt-8 justify-center font-semibold mx-auto w-[370px] hover:cursor-pointer select-none md:py-12">

            <h1 className="text-[rgb(var(--text))] text-2xl text-center md:text-3xl md:mb-8">{title}</h1>

            {isLoading && <p className="text-[rgb(var(--text))] text-center text-xl mb-8">Chargement...</p>}

            {sortedRows ? <ol className="text-black px-4 py-4 text-left">

                {sortedRows.map((row: string[], index: number) => row[1] ?

                    <li key={index} onClick={() => navigate("/stats/" + row[1].toLowerCase())}
                    className={"relative py-2 mb-2 text-lg rounded-lg text-black border-solid overflow-hidden " + (index >= 3 ? "bg-[rgb(var(--text))]" 
                        : (index === 0 ? "bg-[#d1aa2a] text-[rgb(var(--text))]" 
                        : (index === 1 ? "bg-neutral-400 text-[rgb(var(--text))]" 
                        : "text-[rgb(var(--text))] bg-[#a86828]")))}>
                        <span className={"py-2 absolute left-0 top-0 text-xl " + (index >= 3 ? "bg-[rgb(var(--text))] px-4 rounded-l-lg" 
                        : (index === 0 ? "gold text-stone-800 px-5 " 
                        : (index === 1 ? "bg-[rgb(var(--text-muted))] text-[rgb(var(--text))] px-5" 
                        : "brown text-[rgb(var(--text))] px-5 text-xl")))}>{index + 1}</span>
                        <p className={clsx(
                            "text-center pr-4", 
                            index < 3 ? "text-[rgb(var(--text))]" : "")}>{row[1]} </p>
                        <span className={"text-sm py-3 px-3 text-end absolute right-0 top-0 w-[70px] " + (index >= 3 ? " bg-gray-200" 
                        : (index === 0 ? "bg-[#d1aa2a] text-[rgb(var(--text))]" 
                        : (index === 1 ? "bg-[rgb(var(--text-muted))] text-[rgb(var(--text))]" 
                        : "bg-[#a86828] text-[rgb(var(--text))]")))}>{row[0]}pts</span>         
                    </li> 
                : "")}
                
            </ol>
            
            : null}

        </div>
    )

}