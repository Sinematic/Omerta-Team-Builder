import { useMemo } from "react"
import SelectPlayers from "@/features/teamBuilder/SelectPlayers"
import MapLister from "@/features/maps/MapLister"
import Picker from "@/features/teamBuilder/Picker"
import Summary from "@/features/teamBuilder/Summary"
import Button from "@/components/UI/Button"
import { getAllPlayers } from "@/utils/players"
import { type Player } from "@/types/dofus"
import Card from "@/components/UI/Card"
import { useTeamBuilder } from "@/hooks/useTeamBuilder"

export default function TeamBuilder() {

    const players: Player[] = useMemo(() => getAllPlayers(), [])

    const {
        phase,
        playersParticipating,
        teams,
        updateTeams,
        mapUsed,
        togglePlayer,
        chooseFormat,
        nextPhase,
        selectMap,
        messagePhase,
        isValidAmountOfPlayers,
    } = useTeamBuilder()


    return (
        <div className="flex justify-center flex-col pb-[70px]">

            {phase !== "summary" && 
                <p className="px-4 pt-7 text-center italic text-[rgb(var(--text))] animate-pulse text-lg">
                    {messagePhase}
                </p>
            }

            {phase === "registration" && <>

                <SelectPlayers selected={playersParticipating} action={togglePlayer} players={players} />

                { isValidAmountOfPlayers && <Button text="Suivant" action={nextPhase} specifiedClasses="w-fit mx-auto my-8" /> }  
            </>}

            {phase === "format selection" && (
                <div className="w-full h-[70vh] md:w-[70vh] md:h-[60vh] flex flex-cols justify-center gap-2 mx-auto p-2 md:mt-16">

                    <Card text="Capitaines" image="/images/wallpapers/goultard.jpg" action={() => chooseFormat("captains")}
                    description="1 capitaine par équipe, sélection des joueurs en semi-snakes" animated />

                    <Card text="Aléatoire" image="/images/wallpapers/aventuriers-au-zaap.jpg" action={() => chooseFormat("random")}
                    description="Composition aléatoire des équipes" animated />

                </div>
            )}

            {phase === "team allocation" && (
                <Picker players={playersParticipating} captainsAmount={teams.length || 0} 
                teamsHandler={updateTeams} phaseHandler={nextPhase} />
            )}

            {phase === "map selection" && (
                <MapLister mapSelecter={(name, image) => selectMap(name, image)} randomMapButton resetOptions />
            )}

            {phase === "summary" && <Summary map={mapUsed} teams={teams} /> }

        </div>
    )
}
