import '../css/_deleteEntry.scss'

interface Entry {
  id: number
}

type DeleteEntryProps<T extends Entry> = {
  id: number
  itemType: string
  items: T[]
  setItems: (value: T[]) => void
}

export function DeleteEntry<T extends Entry>(props: DeleteEntryProps<T>) {
  const { id, itemType, items, setItems } = props
  const url = 'https://todobackend20230309204702.azurewebsites.net/api'

  function deleteEntry() {
    try {
      fetch(`${url}/${itemType}/${id}`, {
        method: 'DELETE',
      }).then(() => {
        if (itemType === 'category') setItems(items.filter((item) => item.id !== id))
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <button
      className="delete-button"
      onClick={deleteEntry}
      id={`delete-${itemType}-${id}`}
    >
      X
    </button>
  )
}
