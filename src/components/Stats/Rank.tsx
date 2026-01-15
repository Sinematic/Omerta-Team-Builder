import { useStats } from "@/hooks/useStats"

export default function Rank({ title, range } : { title : string, range : string }) {

    const { data, isLoading } = useStats(title, range)

    return (
        <div className="pt-8 justify-center mx-auto w-[370px] hover:cursor-pointer select-none md:py-12">

            <h1 className="text-white text-2xl font-semibold text-center md:text-3xl md:mb-8">{title}</h1>

            {isLoading && <p className="text-white font-semibold text-center text-xl mb-8">Chargement...</p>}

            {data ? <ol className="text-black px-4 py-4 text-left">

                {data.map((row: string[], index: number) => row[1] ?

                    <li key={index} className={"relative bg-white py-2 mb-2 text-lg font-medium rounded-lg text-black " + (index >= 3 ? "" 
                        : (index === 0 ? "border-solid border-2 border-[#d1aa2a]" 
                        : (index === 1 ? "border-solid border-2 border-neutral-400" 
                        : "border-solid border-2 border-[#a86828]")))}>
                        <span className={"py-2 absolute left-0 top-0 font-semibold text-xl " + (index >= 3 ? "bg-white px-4 rounded-l-lg" 
                        : (index === 0 ? "gold text-stone-800 px-5" 
                        : (index === 1 ? "bg-neutral-400 text-white px-5" 
                        : "brown text-white px-5 text-xl")))}>{index + 1}</span>
                        <p className="text-center pr-4">{row[1]} </p>
                        <span className="text-sm font-medium bg-gray-200 py-3 px-3 text-end absolute right-0 top-0 rounded-r-lg w-[70px]">{row[0]}pts</span>         
                    </li> 
                : "")}
                
            </ol>
            
            : null}

        </div>
    )

}