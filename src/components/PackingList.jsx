import { useState } from 'react'
import styles from './PackingList.module.css'

export default function PackingList({ items }) {
  const [open, setOpen] = useState(false)

  const groups = items.reduce((acc, item) => {
    const key = item.listName || 'General'
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {})

  const groupNames = Object.keys(groups)

  return (
    <div className={styles.card}>
      <button className={styles.toggle} onClick={() => setOpen(o => !o)}>
        <span>🧳 Packing List</span>
        <span className={styles.chevron}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className={styles.body}>
          {groupNames.length === 0 ? (
            <p className={styles.empty}>No packing list data found.</p>
          ) : groupNames.map(name => (
            <div key={name} className={styles.group}>
              <h3 className={styles.groupName}>{name}</h3>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Description</th>
                      <th>Qty</th>
                      <th>Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groups[name].map((item, i) => (
                      <tr key={i}>
                        <td>{item.type}</td>
                        <td>{item.description}</td>
                        <td>{item.quantity}</td>
                        <td>{item.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
