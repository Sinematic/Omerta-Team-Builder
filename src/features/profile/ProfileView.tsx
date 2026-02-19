import Button from "@/components/UI/Button"
import type { Player } from "@/types/dofus"
import classesRawData from "@/data/classes.json"
import type { DofusClasses } from "@/types/dofus"


export default function ProfileView({ profileData, deleteProfile } : { profileData: Player, deleteProfile: () => void }) {

    const whoAmI = localStorage.getItem("whoAmI")
    
    const classesData : DofusClasses = classesRawData
    if (!whoAmI) return



    return (
        <div className="w-full h-full rounded-xl bg-[rgb(var(--text))] p-2 md:w-1/3 md:h-auto relative flex flex-col justify-between">
            
            <div className="flex flex-col justify-center gap-1 mx-auto mb-4 relative">
                <div className="rounded-lg overflow-hidden">
                    <img alt={"Profil de " + whoAmI} src={classesData[profileData.classes[0]].image} />
                    {/* <Button text={smallScreen ? "🔧" : "Modifier 🔧"} color="bg-[rgb(var(--bg))]" action={console.log} 
                    specifiedClasses="absolute top-2 right-2 text-lg" padding="p-2" /> */}
                </div>
                
                <h1 className="text-3xl font-semibold">{whoAmI}</h1>
            </div>

            <Button text="Se déconnecter" action={deleteProfile} color="bg-[rgb(var(--warning))]" 
            specifiedClasses="mx-auto" />

        </div>
    )
}