import { useStats } from "@/hooks/useStats"
import { useNavigate } from "react-router"

export default function Rank({ title, range } : { title : string, range : string }) {

    const { data, isLoading } = useStats(title, range)
    const navigate = useNavigate()


    let sortedRows
    
    if (data) sortedRows = [...data].sort((a, b) => a[0] + b[0])

    console.log(sortedRows)


    return (
        <div className="pt-8 justify-center font-semibold mx-auto w-[370px] hover:cursor-pointer select-none md:py-12">

            <h1 className="text-white text-2xl text-center md:text-3xl md:mb-8">{title}</h1>

            {isLoading && <p className="text-white text-center text-xl mb-8">Chargement...</p>}

            {sortedRows ? <ol className="text-black px-4 py-4 text-left">

                {sortedRows.map((row: string[], index: number) => row[1] ?

                    <li key={index} onClick={() => navigate("/stats/" + row[1].toLowerCase())}
                    className={"relative bg-white py-2 mb-2 text-lg rounded-lg text-black border-solid " + (index >= 3 ? "" 
                        : (index === 0 ? "border-3 border-[#d1aa2a]" 
                        : (index === 1 ? "border-3 border-neutral-400" 
                        : "border-3 border-[#a86828]")))}>
                        <span className={"py-2 absolute left-0 top-0 text-xl " + (index >= 3 ? "bg-white px-4 rounded-l-lg" 
                        : (index === 0 ? "gold text-stone-800 px-5" 
                        : (index === 1 ? "bg-neutral-400 text-white px-5" 
                        : "brown text-white px-5 text-xl")))}>{index + 1}</span>
                        <p className="text-center pr-4">{row[1]} </p>
                        <span className={"text-sm py-3 px-3 text-end absolute right-0 top-0 w-[70px] " + (index >= 3 ? "bg-gray-200" 
                        : (index === 0 ? "bg-[#d1aa2a]" 
                        : (index === 1 ? "bg-neutral-400" 
                        : "bg-[#a86828]")))}>{row[0]}pts</span>         
                    </li> 
                : "")}
                
            </ol>
            
            : null}

        </div>
    )

}