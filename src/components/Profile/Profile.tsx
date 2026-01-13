import { useEffect, useState } from "react"
import playersData from "@/data/players.json"
import SelectPlayers from "../TeamBuilder/SelectPlayers"
import { getAllPlayers } from "@/utils/players"
import Button from "../UI/Button"


type Player = typeof playersData[number]
type PlayerName = Player["name"]

type Profile = { name: PlayerName | "", mainClass:  string }


export default function Profile() {

    const whoAmI = localStorage.getItem("whoAmI")
    const players = getAllPlayers()

    const [openConfirm, setOpenConfirm] = useState<boolean>(false)

    const [profile, setProfile] = useState<string>("")

    const [temporaryIdentity, setTemporaryIdentity] = useState<string>("")

    useEffect(() => {  
        
    },[whoAmI])

    //const setAsProfile = () => { setProfile({ name: playersData}) }
    const handleClick = (name : PlayerName) => {
        setTemporaryIdentity(name)
        setOpenConfirm(true)

    }

    const setAsProfile  = () => {
        localStorage.setItem("whoAmI", temporaryIdentity)
        setProfile(temporaryIdentity)
    }


    const handleDeleProfile = () => {
        localStorage.removeItem("whoAmI")
        setProfile("")
        setTemporaryIdentity("")
    }



    return (
        <div className="p-6 space-y-6 w-2/3 mx-auto text-center select-none">
            {/*!profile ? <>
                <SelectPlayers participants={[]} players={players} action={handleClick} message="Clique sur ton nom" /> 
                {openConfirm ? <div className="mx-auto text-white bg-amber-700">
                    <p>Définir {temporaryIdentity} comme profil ?</p>
                    <Button text={"Valider"} action={() => setAsProfile()} />
                    <Button text={"Annuler"} action={() => setOpenConfirm(false)} />
                </div>
                
                : null}

            </>
            : <>
                <p className="text-white text-xl">{whoAmI}</p>
                <Button text="Supprimer données de profil" action={handleDeleProfile} />
            </>*/}
        
        </div>
    )
}
