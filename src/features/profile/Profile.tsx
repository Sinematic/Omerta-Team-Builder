import { useEffect, useMemo, useState } from "react"
import playersData from "@/data/players.json"
import SelectPlayers from "@/features/teamBuilder/SelectPlayers"
import { getAllPlayers } from "@/utils/players"
import Button from "@/components/UI/Button"
import ProfileView from "./ProfileView"


type Player = typeof playersData[number]
type PlayerName = Player["name"]

type Profile = { name: PlayerName | "", mainClass:  string }


export default function Profile() {

    const players : Player[] = useMemo(() => getAllPlayers(), [])

    const [openConfirm, setOpenConfirm] = useState<boolean>(false)
    const [profile, setProfile] = useState<string>(() => localStorage.getItem("whoAmI") ?? "")
    const [temporaryIdentity, setTemporaryIdentity] = useState<string>("")

    let profileData : Player | undefined

    if (profile) profileData = players.find(player => player.name === profile)


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

    useEffect(() => {
        if (!profile) {
            localStorage.removeItem("whoAmI")
            return
        }   
        localStorage.setItem("whoAmI", profile)
        
    }, [profile])


    return (
        <div className="h-[90vh] w-full p-3 grid place-items-center mx-auto text-center select-none md:p-6 md:space-y-6 md:w-2/3 ">
            {profile && profileData ? <ProfileView profileData={profileData} deleteProfile={handleDeleProfile} /> 
            : <>
                <SelectPlayers participants={[]} players={players} action={handleClick} message="Qui es-tu ?" /> 0

                {openConfirm && 
                    <div className="m-4 px-4 py-2 mx-auto text-[rgb(var(--text))] bg-[rgb(var(--bg-lighter))] rounded-xl w-fit">
                        <p className="pb-2 md:text-lg">Tu es <span className="font-semibold">{temporaryIdentity}</span>, c'est ça ?</p>
                        <div className="flex justify-center gap-3">
                            <Button text={"Oui"} action={() => setAsProfile()} />
                            <Button text={"Non"} action={() => setOpenConfirm(false)} color="bg-[rgb(var(--warning))]" />
                        </div>    
                    </div>
                }
            </>}
        
        </div>
    )
}
