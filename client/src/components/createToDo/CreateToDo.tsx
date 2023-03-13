interface Props {
  handleNewDescription: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleNewDueDate: (event: React.ChangeEvent<HTMLInputElement>) => void
  addNewItem: () => void
  description: string
  dueDate: string
  // handleAddNewItem: (description: string, dueDate: string) => void
}

const CreateToDo = ({ handleNewDescription, handleNewDueDate, addNewItem, description, dueDate }: Props) => {


  return (
    <div className="form">
      <input
        type="text"
        value={description}
        onChange={handleNewDescription}
        placeholder="Enter task"
        className="todo-input"
        autoFocus
      />
      <input
        type="date"
        placeholder="Due date"
        value={dueDate}
        onChange={handleNewDueDate}
        className="todo-input"
      />
      <button className="submit" onClick={addNewItem}>
        Add
      </button>
    </div>
  )
}

export default CreateToDo
