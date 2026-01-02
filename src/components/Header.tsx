import { useNavigate } from "react-router"

export default function Header() {

    const navigate = useNavigate()

    return (
        <nav className="bg-emerald-800 h-16 flex items-center px-8">
            <ol className="flex gap-48 justify-center w-full text-white font-semibold">
                <li onClick={() => navigate("/picker")} className={"cursor-pointer hover:text-gray-100 transition-colors duration-200"}>
                    Composition d'équipes
                </li>
                <li onClick={() => navigate("/classes-des-joueurs")} className="cursor-pointer hover:text-gray-100 transition-colors duration-200">
                    Classes des joueurs
                </li>
                <li onClick={() => navigate("/maps")} className="cursor-pointer hover:text-gray-100 transition-colors duration-200">
                    Maps
                </li>
                {/* <li onClick={() => navigate("/stats")} className="cursor-pointer hover:text-gray-1300 transition-colors duration-200">
                    Stats
                </li> */}
                <li onClick={() => navigate("/classement")} className="cursor-pointer hover:text-gray-100 transition-colors duration-200">
                    Classement
                </li>
            </ol>
        </nav>
    )
}
