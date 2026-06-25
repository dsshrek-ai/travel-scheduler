import { useState, useEffect } from 'react'
import { fetchSheetData, extractPackingList, extractTrips } from './utils/sheetsParser'
import TripDetails from './components/TripDetails'
import PackingList from './components/PackingList'
import InstallBanner from './components/InstallBanner'
import styles from './App.module.css'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [packingItems, setPackingItems] = useState([])
  const [tripMap, setTripMap] = useState(new Map())
  const [selectedTrip, setSelectedTrip] = useState('')

  useEffect(() => {
    fetchSheetData()
      .then(rows => {
        setPackingItems(extractPackingList(rows))
        const trips = extractTrips(rows)
        setTripMap(trips)
        if (trips.size > 0) setSelectedTrip([...trips.keys()][0])
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const tripNames = [...tripMap.keys()]
  const currentEntries = tripMap.get(selectedTrip) || []

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.logo}>✈️ Travel Scheduler</h1>
          <button
            className={styles.refreshBtn}
            onClick={() => window.location.reload()}
            title="Refresh data from sheet"
          >
            ↻ Refresh
          </button>
        </div>
      </header>

      <main className={styles.main}>
        {loading && (
          <div className={styles.status}>
            <div className={styles.spinner} />
            <span>Loading from Google Sheets…</span>
          </div>
        )}

        {error && (
          <div className={styles.error}>
            <strong>Could not load sheet data:</strong> {error}
            <p className={styles.errorHint}>
              Make sure your Google Sheet is set to "Anyone with the link can view"
              and try refreshing.
            </p>
          </div>
        )}

        {!loading && !error && (
          <div className={styles.content}>
            {tripNames.length > 0 && (
              <div className={styles.selectorRow}>
                <label htmlFor="trip-select" className={styles.selectorLabel}>
                  Trip
                </label>
                <select
                  id="trip-select"
                  className={styles.selector}
                  value={selectedTrip}
                  onChange={e => setSelectedTrip(e.target.value)}
                >
                  {tripNames.map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
            )}

            <TripDetails tripName={selectedTrip} entries={currentEntries} />

            {packingItems.length > 0 && (
              <PackingList items={packingItems} />
            )}
          </div>
        )}
      </main>
      <InstallBanner />
    </div>
  )
}
