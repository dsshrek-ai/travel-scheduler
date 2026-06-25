import { isPhone, isAddress, formatPhone, mapsUrl } from '../utils/detectors'
import styles from './EntryRow.module.css'

export default function EntryRow({ description, value }) {
  const phone = isPhone(value)
  const address = !phone && isAddress(value)

  return (
    <div className={styles.row}>
      <span className={styles.desc}>{description}</span>
      <span className={styles.value}>
        {phone ? (
          <>
            <span>{formatPhone(value)}</span>
            <a href={`tel:${value.replace(/\s/g, '')}`} className={styles.actionBtn}>
              📞 Call
            </a>
          </>
        ) : address ? (
          <>
            <span>{value}</span>
            <a href={mapsUrl(value)} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
              🗺 Map
            </a>
          </>
        ) : (
          <span>{value}</span>
        )}
      </span>
    </div>
  )
}
