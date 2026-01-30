const modules = import.meta.glob('@/data/seasons/season-*-matches.json', { eager: true })

export const getSeasonsUntil = (currentSeason: number) => {
  return Object.entries(modules)
    .map(([path, mod]) => {
        const match = path.match(/season-(\d+)-matches\.json/)
        if (!match) return null

        return {
            season: Number(match[1]),
            data: (mod as { default: unknown }).default,
        }
    })
    .filter(
      (item): item is { season: number; data: unknown } =>
        !!item && item.season < currentSeason
    )
    .sort((a, b) => a.season - b.season)
}
