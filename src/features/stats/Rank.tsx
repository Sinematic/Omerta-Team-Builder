import { useStats } from "@/hooks/useStats"
import clsx from "clsx"
import { useNavigate } from "react-router"

type SheetData = (number | string | null)[][]

type RankProps = {
    title: string
    page?: string
    range?: string
    file?: SheetData
}

export default function Rank({ page, range, title, file }: RankProps) {


    const navigate = useNavigate()

    const { data, isLoading } = useStats(page as string, range)
    const sourceData: SheetData | undefined = file ?? data


    if (!sourceData || isLoading) return null

    const sortedRows = [...sourceData].sort((a, b) => (b[0] as number) - (a[0] as number))
    const normalizedRows = sortedRows.map(row => row.map(cell => cell ?? ""))
    const clearedRows = [...normalizedRows].filter(row => row[0] as number > 0)


    return (
        <div className="pt-8 pb-[60px] justify-center font-semibold mx-auto hover:cursor-pointer select-none md:p-12">

            <h1 className="text-[rgb(var(--text))] text-2xl text-center md:text-3xl md:mb-8">{title}</h1>

            {isLoading && <p className="text-[rgb(var(--text))] text-center text-xl mb-8">Chargement...</p>}

            {clearedRows && clearedRows.length > 0 ? <ol className="text-black px-4 pt-8 text-left w-[370px] mx-auto">

                {clearedRows.map((row: (string | number )[], index: number) => row[1] ?

                    <li key={index} onClick={() => navigate("/stats/" + String(row[1]).toLowerCase())}
                    className={"relative py-2 mb-2 text-lg rounded-lg text-[rgb(var(--bg))] border-solid overflow-hidden " + 
                        (index >= 3 || row[0] as number < 1 ? "bg-[rgb(var(--text))]" 
                        : (index === 0 ? "bg-[#d1aa2a] text-[rgb(var(--text))]" 
                        : (index === 1 ? "bg-neutral-400 text-[rgb(var(--text))]" 
                        : "text-[rgb(var(--text))] bg-[#a86828]")))}>

                        <span className={"py-2 absolute left-0 top-0 text-xl " + 
                        (index >= 3 || row[0] as number < 1 ? "bg-[rgb(var(--text))] px-4 rounded-l-lg" 
                        : (index === 0 ? "gold text-stone-800 px-5 " 
                        : (index === 1 ? "bg-[rgb(var(--text-muted))] text-[rgb(var(--text))] px-5" 
                        : "brown text-[rgb(var(--text))] px-5 text-xl")))}>{row[0] as number > 0  ? index + 1 : "-"}</span>

                        <p className={clsx("text-center pr-4", 
                        row[0] as number > 1  && index < 3 ? "text-[rgb(var(--text))]" : "")}>
                                {row[1]} 
                        </p>

                        <span className={"text-sm py-3 px-3 text-end absolute right-0 top-0 w-[70px] " + 
                        (index >= 3 || row[0] as number < 1 ? " bg-gray-200" 
                        : (index === 0 ? "bg-[#d1aa2a] text-[rgb(var(--text))]" 
                        : (index === 1 ? "bg-[rgb(var(--text-muted))] text-[rgb(var(--text))]" 
                        : "bg-[#a86828] text-[rgb(var(--text))]")))}>
                            {row[0]}pts
                        </span>         
                    </li> 
                : "")}
                
            </ol>
            
            : <h2 className="text-[rgb(var(--text))] w-fit mx-auto text-lg">Pas de données pour cette saison !</h2>}

        </div>
    )

}