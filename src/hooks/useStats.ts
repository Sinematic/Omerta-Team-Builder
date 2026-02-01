import { useQuery } from "@tanstack/react-query"
import { fetchStats } from "@/services/stats.service"

export const useStats = (sheet: string, range?: string, source?: string) => {
    return useQuery({
        queryKey: ['stats', sheet, range],
        queryFn: () => fetchStats(sheet, range, source)
    })
}