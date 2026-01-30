export const fetchStats = async (sheet: string, range?: string, source?:string) => {

    if(!sheet) return null

    const params = new URLSearchParams({
        tqx: 'out:json',
        ...(sheet && { sheet }),
        ...(range && { range }),
    })

    const ID = source ?? import.meta.env.VITE_GOOGLE_SHEETS_ID   
    const res = await fetch(`https://docs.google.com/spreadsheets/d/${ID}/gviz/tq?${params}`) 

    if (!res.ok) throw new Error('Erreur Google Sheets API')

    const text = await res.text()

    const json = JSON.parse(
        text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1)
    )

    // @ts-expect-error unkwown types
    const rows = json.table.rows.map(row =>
        // @ts-expect-error unkwown types
        row.c.map(cell => cell?.v ?? null)
    )

    return rows
}