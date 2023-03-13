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
  const deleteRef = useRef<HTMLButtonElement>(null)
  const confirmRef = useRef<HTMLDivElement>(null)

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

  function toggleConfirmDelete() {
    deleteRef.current?.classList.toggle('hidden')
    confirmRef.current?.classList.toggle('hidden')
  }

  return (
    <>
      <button
        className="delete-button"
        onClick={toggleConfirmDelete}
        id={`delete-${entryType}-${id}`}
        ref={deleteRef}
      >
        <img src="/icons/trashcan.svg" className="trashcan" />
      </button>
      <div className="confirm-delete hidden" ref={confirmRef}>
        <button className="confirm" onClick={deleteEntry}>
          <img src="/icons/checkmark.svg" className="checkmark" />
        </button>
        <button className="cancel" onClick={toggleConfirmDelete}>
          <img src="/icons/cancel.svg" className="cancelmark" />
        </button>
      </div>
    </>
  )
}
