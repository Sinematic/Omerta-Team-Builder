import { useStats } from "@/hooks/useStats"

export default function Rank({ title, range } : { title : string, range : string }) {

    const { data, isLoading } = useStats(title, range)

    return (
        <div className="py-12 justify-center mx-auto w-[370px] hover:cursor-pointer select-none">

            <h1 className="text-white font-semibold text-center text-3xl mb-8">{title}</h1>

            {isLoading && <p className="text-white font-semibold text-center text-xl mb-8">Chargement...</p>}

            {data ? <ol className="text-black px-4 py-4 text-left">

                {data.map((row: string[], index: number) => row[1] ?

                    <li key={index} className={"text-lg py-2 mb-2 font-medium rounded-lg text-black " + 
                        (index >= 3 ? "bg-white font-semibold" 
                        : (index === 0 ? "gold text-stone-800 font-semibold" 
                        : (index === 1 ? "bg-neutral-400 text-white font-semibold" 
                        : "brown text-white")))}>
                        <span className="px-4 text-beginning font-bold">{index < 9 ? '0' + (index + 1) : index + 1}</span>
                        <span className="pl-16">{row[1]} </span>
                        <span className="text-small font-thin">({row[0]})</span>         
                    </li> : ""

                )}
                
            </ol>
            
            : null}

        </div>
    )

}