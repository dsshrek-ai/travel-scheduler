import { useState, useEffect } from 'react'
import styles from './PackingList.module.css'

const STORAGE_KEY = 'travel-scheduler-packing'

function loadChecked() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveChecked(checked) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(checked))
}

export default function PackingList({ items }) {
  const [open, setOpen] = useState(false)
  const [selectedList, setSelectedList] = useState('')
  const [checked, setChecked] = useState(loadChecked)

  // Group items by list name
  const groups = items.reduce((acc, item) => {
    const key = item.listName || 'General'
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {})
  const listNames = Object.keys(groups)

  // Auto-select the first list
  useEffect(() => {
    if (listNames.length > 0 && !selectedList) {
      setSelectedList(listNames[0])
    }
  }, [listNames.length])

  const currentItems = groups[selectedList] || []

  const itemKey = (listName, index) => `${listName}::${index}`

  function toggle(listName, index) {
    const key = itemKey(listName, index)
    const next = { ...checked, [key]: !checked[key] }
    setChecked(next)
    saveChecked(next)
  }

  function clearList(listName) {
    const next = { ...checked }
    groups[listName].forEach((_, i) => delete next[itemKey(listName, i)])
    setChecked(next)
    saveChecked(next)
  }

  const checkedCount = currentItems.filter((_, i) => checked[itemKey(selectedList, i)]).length

  return (
    <div className={styles.card}>
      <button className={styles.toggle} onClick={() => setOpen(o => !o)}>
        <span>🧳 Packing List</span>
        <span className={styles.chevron}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className={styles.body}>
          {listNames.length === 0 ? (
            <p className={styles.empty}>No packing list data found.</p>
          ) : (
            <>
              <div className={styles.toolbar}>
                <select
                  className={styles.listSelector}
                  value={selectedList}
                  onChange={e => setSelectedList(e.target.value)}
                >
                  {listNames.map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
                <span className={styles.progress}>
                  {checkedCount}/{currentItems.length} packed
                </span>
                {checkedCount > 0 && (
                  <button
                    className={styles.clearBtn}
                    onClick={() => clearList(selectedList)}
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className={styles.checklist}>
                {currentItems.map((item, i) => {
                  const key = itemKey(selectedList, i)
                  const isChecked = !!checked[key]
                  return (
                    <label key={i} className={`${styles.checkRow} ${isChecked ? styles.done : ''}`}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={isChecked}
                        onChange={() => toggle(selectedList, i)}
                      />
                      <span className={styles.checkDesc}>{item.description}</span>
                      {(item.quantity || item.unit) && (
                        <span className={styles.checkMeta}>
                          {item.quantity}{item.unit ? ` ${item.unit}` : ''}
                        </span>
                      )}
                      {item.type && (
                        <span className={styles.checkType}>{item.type}</span>
                      )}
                    </label>
                  )
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
