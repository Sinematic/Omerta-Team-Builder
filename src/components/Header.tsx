import { useNavigate } from "react-router"

export default function Header() {

    const navigate = useNavigate()

    return (
        <nav className="bg-gray-900 h-16 flex items-center px-8">
            <ol className="flex gap-48 justify-center w-full text-white font-medium">
                <li onClick={() => navigate("/picker")} className={"cursor-pointer hover:text-gray-300 transition-colors duration-200"}>
                    Composition d'équipes
                </li>
                <li onClick={() => navigate("/classes-des-joueurs")} className="cursor-pointer hover:text-gray-300 transition-colors duration-200">
                    Classes des joueurs
                </li>
                <li onClick={() => navigate("/bibliothèque-de-maps")} className="cursor-pointer hover:text-gray-300 transition-colors duration-200">
                    Bibliothèque de maps
                </li>
            </ol>
        </nav>
    )
}
