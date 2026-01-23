import { NavLink } from "react-router-dom"
import type { HeaderProps } from "@/components/UI/HeaderDesktop"


export default function HeaderMobileBottomNav({ linksClasses, links } : HeaderProps) {

    return (
		<nav className="w-full fixed bottom-0 left-0 shadow-md z-50 h-12 flex items-center
		bg-[rgb(var(--bg))] overflow-hidden select-none px-8 " 
		aria-label="Navigation des fonctionnalités">
			<ul className="flex gap-4 justify-around w-full text-[rgb(var(--text))] font-semibold items-center">
				
				{links.map((link) => 
                    <li key={link.path}>
                        <NavLink to={link.path} className={linksClasses}>{link.short ?? link.label}</NavLink>
                    </li>
                )}              
			</ul>
		</nav>
	)
}
		
