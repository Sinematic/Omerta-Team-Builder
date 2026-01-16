import { useEffect, useState } from "react"
import playersData from "@/data/players.json"
import SelectPlayers from "@/features/teamBuilder/SelectPlayers"
import { getAllPlayers } from "@/utils/players"
import Button from "@/components/UI/Button"


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
        <div className="w-full p-3 mx-auto text-center select-none md:p-6 md:space-y-6 md:w-2/3">
            {!profile ? <>
                <SelectPlayers participants={[]} players={players} action={handleClick} message="Clique sur ton nom" /> 
                {openConfirm ? <div className="m-4 px-4 py-2 mx-auto text-white bg-neutral-700 rounded-xl w-fit">
                    <p className="pb-2 md:text-lg">Tu es <span className="font-semibold">{temporaryIdentity}</span>, c'est ça ?</p>
                    <div className="flex flex-cols justify-center gap-3">
                        <Button text={"Oui"} action={() => setAsProfile()} />
                        <Button text={"Non"} action={() => setOpenConfirm(false)} color="bg-amber-700" />
                    </div>
                    
                </div>
                
                : null}

            </>
            : <>
                <p className="text-white text-xl">{whoAmI}</p>
                <Button text="Supprimer données de profil" action={handleDeleProfile} />
            </>}
        
        </div>
    )
}
