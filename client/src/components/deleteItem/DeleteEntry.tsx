import { useRef } from 'react'
import '../css/_deleteEntry.scss'

interface Entry {
  id: number
}

type DeleteEntryProps<T extends Entry> = {
  id: number
  entryType: string
  entries: T[]
  setEntries: (value: T[]) => void
}

export function DeleteEntry<T extends Entry>(props: DeleteEntryProps<T>) {
  const { id, entryType, entries, setEntries } = props
  const url = 'https://todobackend20230309204702.azurewebsites.net/api'
  const deleteRef = useRef(null)

  function deleteEntry() {
    try {
      fetch(`${url}/${entryType}/${id}`, {
        method: 'DELETE',
      }).then(() => {
        if (entryType === 'category')
          setEntries(entries.filter((entry) => entry.id !== id))
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <button
      className="delete-button"
      onClick={deleteEntry}
      id={`delete-${entryType}-${id}`}
      ref={deleteRef}
    >
      <img src="/icons/trashcan.svg" className="trashcan" />
    </button>
  )
}
