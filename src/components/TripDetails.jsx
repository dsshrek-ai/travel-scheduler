import EntryRow from './EntryRow'
import styles from './TripDetails.module.css'

export default function TripDetails({ tripName, entries }) {
  if (!tripName) {
    return (
      <div className={styles.empty}>
        <p>Select a trip above to view its details.</p>
      </div>
    )
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{tripName}</h2>
      {entries.length === 0 ? (
        <p className={styles.noData}>No entries found for this trip.</p>
      ) : (
        <div className={styles.entries}>
          {entries.map((entry, i) => (
            <EntryRow key={i} description={entry.description} value={entry.value} />
          ))}
        </div>
      )}
    </div>
  )
}
