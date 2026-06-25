const SHEET_ID = '1vc3gAYTiZmtMsqYDG_nhH56B9zMPPmptYOrkNirMg6Y'

// Fetches raw CSV via the Google Sheets gviz endpoint (no API key needed for public sheets)
export async function fetchSheetData() {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&range=A:I`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch sheet: ${res.status}`)
  const text = await res.text()
  return parseCSV(text)
}

function parseCSV(text) {
  const rows = []
  let current = ''
  let inQuotes = false
  let fields = []

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (ch === ',' && !inQuotes) {
      fields.push(current.trim())
      current = ''
    } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
      if (ch === '\r' && text[i + 1] === '\n') i++
      fields.push(current.trim())
      rows.push(fields)
      fields = []
      current = ''
    } else {
      current += ch
    }
  }
  if (current || fields.length) {
    fields.push(current.trim())
    rows.push(fields)
  }
  return rows
}

export function extractPackingList(rows) {
  const items = []
  for (const row of rows) {
    const listName = row[0]
    if (!listName) continue
    items.push({
      listName,
      type: row[1] || '',
      description: row[2] || '',
      quantity: row[3] || '',
      unit: row[4] || '',
    })
  }
  return items
}

export function extractTrips(rows) {
  const tripMap = new Map()
  for (const row of rows) {
    const tripName = row[6]
    if (!tripName) continue
    if (!tripMap.has(tripName)) tripMap.set(tripName, [])
    const desc = row[7] || ''
    const value = row[8] || ''
    if (desc || value) {
      tripMap.get(tripName).push({ description: desc, value })
    }
  }
  return tripMap
}
