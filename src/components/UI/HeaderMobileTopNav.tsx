import { NavLink } from "react-router-dom"
import type { HeaderProps } from "@/components/UI/HeaderDesktop"
import SearchButton from "@/components/UI/SearchButton"


export default function HeaderMobileTopNav({ linksClasses, links } : HeaderProps) {

    return (
        <nav className="w-full bg-[rgb(var(--very-dark-green))] h-16 flex justify-around overflow-hidden select-none px-8" 
        aria-label="Navigation principale">
            <ul className="flex justify-around w-full text-[rgb(var(--text))] font-semibold items-center">
                
                {links.map((link) => 
                    <li key={link.path}>
                        <NavLink to={link.path} className={linksClasses}>
                            {link.short ??  link.label}
                            </NavLink>
                    </li>
                )}

                <li>
                    <SearchButton />
                </li>
                
            </ul>
        </nav>
    )
}
        
