import Button from "@/components/UI/Button"
import Card from "@/components/UI/Card"
import tournamentTeams from "@/data/tournament-teams.json"
import { useMemo, useState } from "react"


type TeamInTournament = {
    name: string
    image: string
    discordTags: string
}


export default function TournamentMatchAnnounced() {

    const [teamsData, setTeamsData] = useState<TeamInTournament[]>(tournamentTeams.teams)

    const [teams, setTeams] = useState<TeamInTournament[]>([])
    const [visible, setVisible] = useState(false)

    const handleTeamClick = (teamClicked: TeamInTournament) => {
        const availableTeams = teamsData.filter(team => team.name !== teamClicked.name)
        setTeamsData(availableTeams)
        setTeams(prev => [...prev, teamClicked])
    }

    const handleCopy = async (message: string) => {
        await navigator.clipboard.writeText(message)
        setVisible(true)
        setTimeout(() => {
            setVisible(false)
        }, 6000) 
    }


    const discordMessage = useMemo(() => {
        if (teams.length !== 2) return ""
        return `**${teams[0].name}** VS **${teams[1].name}** (${teams[0].discordTags} ${teams[1].discordTags})`
    }, [teams])


    return (<div className="max-w-[1080px] mx-auto my-4 p-8 flex flex-col gap-8 text-[rgb(var(--text))] text-center place-items-center">

        {teams.length < 2 ?  <>

            <h1 className="text-3xl font-semibold">Inscription de deux équipes à un match</h1>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {teamsData.map((team) => 
                    <Card text={team.name} image={team.image} action={() => handleTeamClick(team)} key={team.name} 
                    borderColor="border-[rgb(var(--lightest-gray))]" />
                )} 
            </div>


        </> : <>

            <Button text="Copier le message Discord" action={() => handleCopy(discordMessage)} specifiedClasses="mx-auto" />
        
            <div className="w-full relative flex flex-row mx-auto mt-4">
                <img src="/images/tournament_match_background.webp" />

                <div className="absolute w-[300px] h-[300px] rounded-full overflow-hidden z-20 top-[220px] left-[130px] bg-white">
                    <img src={teams[0].image} alt={teams[0].name} className="w-full h-full object-cover object-center block" />
                </div>

                <div className="absolute w-[300px] h-[300px] rounded-full overflow-hidden z-20 top-[220px] right-[120px] bg-white">
                    <img src={teams[1].image} alt={teams[1].name} />
                </div>
            </div>

            {visible && 
                <p className="rounded-xl bg-[rgb(var(--success))] text-[rgb-(var(--text))] absolute bottom-4 z-50 p-2">
                    Message copié dans le presse-papiers !
                </p>
            }

        </>}

    </div>)
}
