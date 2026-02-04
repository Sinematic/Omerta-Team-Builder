import restrictedAreasData from "@/data/restricted-areas.json"
import RestrictedElement from "./RestrictedElement"

export type AreaType = {
    name: string
    category: string
    subcategory?: string
    quest?: string
}


export default function RestrictedAreasPage() {

    const restrictedAreas: AreaType[] =  restrictedAreasData

    

    return (
        <div className="w-full mx-auto text-[rgb(var(--text))] py-16 cursor-pointer select-none ">

            <h1 className="text-center text-xl pb-8">Accès aux zones</h1>

            {restrictedAreas ? 
                <ol className=" w-full md:max-w-[450px] space-y-3 text-center mx-auto">
                    {restrictedAreasData.map(area => 
                        <RestrictedElement area={area} />
                    )}
                </ol> 
            : null}

        </div>
    )
}
