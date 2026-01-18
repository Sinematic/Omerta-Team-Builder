import { isSmallScreen } from "@/utils/players"
//import { handleTheme } from "@/utils/theme"
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

    const smallScreen = isSmallScreen()

    //const theme = handleTheme()

    //const [toggleTheme, setToggleTheme ] = useState(theme)

    
    return (
        <nav className="w-full bg-[rgb(var(--very-dark-green))] h-16 flex items-center px:3 md:px-8 overflow-hidden" aria-label="Navigation principale">
            <ul className="flex gap-4 justify-center w-full text-[rgb(var(--text))] font-semibold items-center md:gap-48">

                <li>
                    <NavLink to="/picker" className={linksClasses}>Composition d'équipes</NavLink>
                </li>
                <li>
                    <NavLink to="/classes-des-joueurs" className={linksClasses}>Classes des joueurs</NavLink>
                </li>

                <li>
                    <NavLink to="/maps" className={linksClasses}>Maps</NavLink>
                </li>
                <li>
                    <NavLink to="/classement" className={linksClasses}>Classement</NavLink>
                </li>
                <li>
                    <input type="text" className="bg-[rgb(var(--text))] rounded-lg text-black px-2 md:px-3 py-1 focus:outline-none focus:ring-0" 
                    placeholder={smallScreen ? "Rechercher" : "Rechercher un joueur"} aria-label="Rechercher un joueur"
                    onChange={(e) => setPseudoSearched(e.target.value)} value={pseudoSearched} 
                    onKeyDown={(e) => e.key === "Enter" ? search(pseudoSearched) : ""}/>
                </li>

                {/* <li className={clsx(toggleTheme === "dark"? "justify-end" : "justify-start" ,"w-[50px] h-[25px] bg-[rgb(var(--text))] rounded-xl flex align-center p-[2px]")}>
                    <p onClick={() => handleToggleTheme()}
                    className="w-[21px] h-[21px] bg-[rgb(var(--text))] border-solid border-1 border-[rgb(var(--surface))] rounded-full"></p>
                </li> */}
            </ul>
        </nav>
    )
}
