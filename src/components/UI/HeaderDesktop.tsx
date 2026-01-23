import { NavLink } from "react-router-dom"
import type { NavLinkType } from "@/components/UI/HeaderPage"
import SearchButton from "@/components/UI/SearchButton"


export type HeaderProps = {
    linksClasses : string
    links: NavLinkType[]
}

export default function HeaderDesktop({ linksClasses, links } : HeaderProps) {


    return (
        <nav className="w-full bg-[rgb(var(--very-dark-green))] h-16 flex items-center overflow-hidden select-none px:3 md:px-8" 
        aria-label="Navigation principale">
            <ul className="flex gap-4 justify-center w-full text-[rgb(var(--text))] font-semibold items-center md:gap-48">
                
                {links.map((link) => 
                    <li key={link.path}>
                        <NavLink to={link.path} className={linksClasses}>{link.label}</NavLink>
                    </li>
                )}
                
                <li>
                    <SearchButton />
                </li>

            </ul>
        </nav>
    )
}
