import Button from "@/components/UI/Button"
import tournamentTeams from "@/data/tournament-teams.json"
import { useMemo, useState } from "react"


type TeamInTournament = {
    name: string
    image: string
    discordTags: string
}


export default function TournamentMatchAnnounced() {

    const [teamsData, setTeamsData] = useState<[] | TeamInTournament[]>(tournamentTeams.teams)

    const [teams, setTeams] = useState<[] | TeamInTournament[]>([])
    const [visible, setVisible] = useState(false)

    const handleTeamClick = (teamClicked: TeamInTournament) => {
        const availableTeams = teamsData.filter(team => team.name !== teamClicked.name)
        setTeamsData(availableTeams)
        setTeams([...teams, teamClicked])
    }

    const handleCopy = async (message: string) => {
        await navigator.clipboard.writeText(message)
        setTimeout(() => {
            setVisible(true)
        }, 10000) 
    }


    const discordMessage = useMemo(() => {
        if (teams.length !== 2) return ""
        return `**${teams[0].name}** VS **${teams[1].name}** (${teams[0].discordTags} ${teams[1].discordTags})`
    }, [teams])


    return (<div className="mx-auto max-w-[1080px] p-8 my-8 text-[rgb(var(--text))] text-center">

        {teams.length < 2 ?  <>

            {teamsData.map((team, index) => 
                <p onClick={() => handleTeamClick(team)} key={index} className=" hover:cursor-pointer">{team.name}</p>
            )}

        </> : <>

            <Button text="Copier le message Discord" action={() => handleCopy(discordMessage)} />
        
            <div className="w-full relative flex flex-rows mx-auto mt-8">
                <img src="/images/tournament_match_background.webp" />

                <div className="absolute w-[300px] h-[300px] rounded-full overflow-hidden z-20 top-[220px] left-[130px] bg-white">
                    <img src={teams[0].image} alt={teams[0].name} className="w-full h-full object-cover object-center block" />
                </div>

                <div className="absolute w-[300px] h-[300px] rounded-full overflow-hidden z-20 top-[220px] right-[120px] bg-white">
                    <img src={teams[1].image} alt={teams[1].name} />
                </div>
            </div>

            {visible && <p className="rounded-xl bg-[rgb(var(--success))] text-[rgb-(var(--text))] absolute bottom-4 z-50">Message copié dans le presse-papiers !</p>}

        </>}

    </div>)
}
