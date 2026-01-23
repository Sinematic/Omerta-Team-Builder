import { useState } from "react"
import { useNavigate } from "react-router"


export default function SearchButton() {

    const navigate = useNavigate()
    const [pseudoSearched, setPseudoSearched] = useState("")

    const search = (value: string) => { 
        const lowerCase = value.toLowerCase()
        navigate("/stats/" + lowerCase) 
    }


    return (
        <input type="text" className="bg-[rgb(var(--text))] max-w-[105px] rounded-lg text-black px-2 md:px-3 py-1 
        md:max-w-[195px] focus:outline-none focus:ring-0" 
        placeholder="Rechercher un joueur" aria-label="Rechercher un joueur"
        onChange={(e) => setPseudoSearched(e.target.value)} value={pseudoSearched} 
        onKeyDown={(e) => e.key === "Enter" ? search(pseudoSearched) : ""} />
    )
}
