import { useNavigate } from "react-router"

export default function Header() {

    const navigate = useNavigate()

    return (
        <nav className="bg-gray-900 h-16 flex items-center px-8">
            <ol className="flex gap-64 justify-center w-full justify-around text-white font-medium">
                <li onClick={() => navigate("/picker")} className={"cursor-pointer hover:text-gray-300 transition-colors duration-200"}>
                    Composer des équipes
                </li>
                <li onClick={() => navigate("/classes-des-joueurs")} className="cursor-pointer hover:text-gray-300 transition-colors duration-200">
                    Les classes des joueurs
                </li>
            </ol>
        </nav>
    )
}
