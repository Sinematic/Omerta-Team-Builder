import { useState } from "react"
import { useNavigate } from "react-router"
import { NavLink } from "react-router-dom"

export default function Header() {

    const navigate = useNavigate()
    const linksClasses = "cursor-pointer hover:text-gray-100 transition-colors duration-200"

    const [pseudoSearched, setPseudoSearched] = useState("")

    const search = (name : string) => { 
        const lowerCase = name.toLowerCase()
        navigate("/stats/" + lowerCase) 
    }

    
    return (
        <nav className="bg-emerald-900 h-16 flex items-center px-8">
            <ul className="flex gap-48 justify-center w-full text-white font-semibold items-center">
                <NavLink to="/picker" className={linksClasses}>
                    Composition d'équipes
                </NavLink>

                <NavLink to="/classes-des-joueurs" className={linksClasses}>
                    Classes des joueurs
                </NavLink>

                <NavLink to="/maps" className={linksClasses}>
                    Maps
                </NavLink>

                <NavLink to="/classement" className={linksClasses}>
                    Classement
                </NavLink>

                <input type="text" className="bg-white rounded-lg text-black px-3 py-2 focus:outline-none focus:ring-0" 
                placeholder="Chercher un joueur" onChange={(e) => setPseudoSearched(e.target.value)} value={pseudoSearched} 
                onKeyDown={(e) => e.key === "Enter" ? search(pseudoSearched) : ""}/>
            </ul>
        </nav>
    )
}
