import Button from "@/components/UI/Button"
import type { Player } from "@/types/dofus"
import classesRawData from "@/data/classes.json"
import type { DofusClasses } from "@/types/dofus"


export default function ProfileView({ profileData, deleteProfile } : { profileData: Player, deleteProfile: () => void }) {

    const whoAmI = localStorage.getItem("whoAmI")

    const classesData : DofusClasses = classesRawData

    if (!whoAmI) return


    return (
        <div className="w-full rounded-md bg-neutral-700 p-4 md:w-1/2">
            <div className="flex flex-col justify-center max-w-[180px] gap-1 mx-auto mb-4">
                <p className="text-white text-2xl font-semibold">{whoAmI}</p>
                <div className="rounded-full overflow-hidden border-solid border-emerald-600 border-5">
                    <img alt={"Profil de " + whoAmI} src={classesData[profileData.classes[0]].image} />
                </div>
            </div>

            <Button text="Supprimer données de profil" action={deleteProfile} color="bg-amber-700" />

        </div>
    )
}
