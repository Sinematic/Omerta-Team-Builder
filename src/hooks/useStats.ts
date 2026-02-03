import { useQuery } from "@tanstack/react-query"
import { fetchStats } from "@/services/stats.service"

export function useStats(sheet: string, range?: string, source?: string) {
    return useQuery({
        queryKey: ['stats', sheet, range],
        queryFn: () => fetchStats(sheet, range, source)
    })
}