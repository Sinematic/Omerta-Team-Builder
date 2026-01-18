export const handleTheme = () => {

    const themeStored = localStorage.getItem("theme")

    if(themeStored) {
        document.documentElement.dataset.theme = themeStored
        return themeStored
    }
    
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    document.documentElement.dataset.theme = prefersDark ? "dark" : ""
    return document.documentElement.dataset.theme
}