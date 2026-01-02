type SelectPlayersProps = {
    participants: string[],
    handleClickOnParticipants: (player: string) => void
    players: { name: string, classes: string[] }[]
}

export default function SelectPlayers({ participants, handleClickOnParticipants, players } : SelectPlayersProps) {


    const message = ((length: number) => {
        if (length === 0) return "Aucun joueur n'a été sélectionné";
        if (length === 1) return "1 joueur a été sélectionné";
        return length + " joueurs ont été sélectionnés";
    })


    return (<>
        <h2 className="select-none text-center py-8 text-white">{message(participants.length)}</h2>
        <ul className="grid grid-cols-4 gap-2 max-w-xl mx-auto select-none">
            {players.map((player) => 
                <li className={`px-4 py-2 text-center cursor-pointer ${participants.includes(player.name) ? " bg-emerald-700 text-white" : "bg-white"}`} 
                key={player.name} onClick={() => handleClickOnParticipants(player.name)}>
                    {player.name}
                </li> 
            )}
        </ul>
    </>)
}
