import { useStats } from "@/hooks/useStats"


export default function CallAPI() {

    const { data, isLoading } = useStats("Matchs", "")

    return (
        <div>
            {isLoading && <p>Chargement...</p>}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    )
}
