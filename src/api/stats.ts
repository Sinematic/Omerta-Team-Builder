export const fetchStats = async () => {

    const res = await fetch('https://docs.google.com/spreadsheets/d/1F2LN-QA-8fAihWl0lPlPNrKs7P7Ia8V4D2ilJ39ZX30/edit?gid=0#gid=0')

    if (!res.ok) throw new Error('Erreur API')
    
    return res.json()
}