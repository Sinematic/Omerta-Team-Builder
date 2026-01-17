import Button from "@/components/UI/Button"

export default function ProfileView({ deleteProfile } : { deleteProfile: () => void }) {

    const whoAmI = localStorage.getItem("whoAmI")


    if(!whoAmI) return


    return (
        <div>
            <p className="text-white text-xl">{whoAmI}</p>
            <Button text="Supprimer données de profil" action={deleteProfile} />
        </div>
    )
}
