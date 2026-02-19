import HeaderMobileBottomNav from "@/components/UI/HeaderMobileBottomNav"
import HeaderDesktop from "./HeaderDesktop"
import { isSmallScreen } from "@/utils/players"
import HeaderMobileTopNav from "./HeaderMobileTopNav"


export type NavLinkType = { 
    path: string
    label: string
    short?: string
    position?: string
}


export default function HeaderPage() {

    const smallScreen = isSmallScreen()
    const linksClasses = "cursor-pointer hover:text-gray-100 transition-colors duration-200"

    const navLinks : NavLinkType[] = [
        { path: "/", label: "Accueil", position: "top" },
        { path: "/draft", label: "Composition d'équipes", short: "Draft", position: "bottom" },
        { path: "/classes-des-joueurs", label: "Classes des joueurs", short: "Classes", position: "bottom" },
        { path: "/maps", label: "Maps", position: "bottom" },
        { path: "/classement", label: "Classement", position: "bottom" }
    ]

    const mobileTopNavLinks = [...navLinks].filter(link => link.position === "top")
    const mobileBottomNavLinks = [...navLinks].filter(link => link.position === "bottom")


    return smallScreen ? (
        <>
            <HeaderMobileTopNav linksClasses={linksClasses} links={mobileTopNavLinks} />
            <HeaderMobileBottomNav linksClasses={linksClasses} links={mobileBottomNavLinks} />
        </>
    ) : (
        <HeaderDesktop linksClasses={linksClasses} links={navLinks} />
    )
}
