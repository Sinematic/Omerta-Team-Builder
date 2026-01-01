export const fetchStats = async (sheet: string, range?: string) => {

    const params = new URLSearchParams({
        tqx: 'out:json',
        ...(sheet && { sheet }),
        ...(range && { range }),
    })

    const ID = '1F2LN-QA-8fAihWl0lPlPNrKs7P7Ia8V4D2ilJ39ZX30'

   const res = await fetch(`https://docs.google.com/spreadsheets/d/${ID}/gviz/tq?${params}`) 
    if (!res.ok) throw new Error('Erreur Google Sheets API')

    const text = await res.text()

    const json = JSON.parse(
        text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1)
    )

    const rows = json.table.rows.map(row =>
        row.c.map(cell => cell?.v ?? null)
    )


    return rows
}