import { useQuery } from "@tanstack/react-query"
import { fetchStats } from "@/api/stats"

export const useStats = (sheet: string, range?: string) => {
    return useQuery({
        queryKey: ['stats'],
        queryFn: () => fetchStats(sheet, range)
    })
}