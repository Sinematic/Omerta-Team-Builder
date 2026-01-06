import { useState } from "react"
import { useNavigate } from "react-router"

export default function Header() {

    const navigate = useNavigate()

    const search = (name : string) => { 
        const lowerCase = name.toLowerCase()
        navigate("/stats/" + lowerCase) 
    }

    const [pseudoSearched, setPseudoSearched] = useState("")

    
    return (
        <nav className="bg-emerald-900 h-16 flex items-center px-8">
            <ol className="flex gap-48 justify-center w-full text-white font-semibold items-center">
                <li onClick={() => navigate("/picker")} className={"cursor-pointer hover:text-gray-100 transition-colors duration-200"}>
                    Composition d'équipes
                </li>
                <li onClick={() => navigate("/classes-des-joueurs")} className="cursor-pointer hover:text-gray-100 transition-colors duration-200">
                    Classes des joueurs
                </li>
                <li onClick={() => navigate("/maps")} className="cursor-pointer hover:text-gray-100 transition-colors duration-200">
                    Maps
                </li>
                <li onClick={() => navigate("/classement")} className="cursor-pointer hover:text-gray-100 transition-colors duration-200">
                    Classement
                </li>
                <li onClick={() => navigate("/test")} className="cursor-pointer hover:text-gray-100 transition-colors duration-200">
                    Test
                </li>

                <input type="text" className="bg-white rounded-lg text-black px-3 py-2 focus:outline-none focus:ring-0" 
                placeholder="Chercher un joueur" onChange={(e) => setPseudoSearched(e.target.value)} value={pseudoSearched} 
                onKeyDown={(e) => e.key === "Enter" ? search(pseudoSearched) : ""}/>
            </ol>
        </nav>
    )
}
