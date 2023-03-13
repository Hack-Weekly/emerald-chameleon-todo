import type { Categories, Items } from '../../../types/data'
import './_ToDoList.scss'
import { useState, useEffect, useRef } from 'react'

import PostToDoStatus from '../../functions/PostToDoStatus'
import CreateToDo from '../createToDo/CreateToDo'

interface ListProps {
  selectedCategories: Categories[]
  items: Items[]
  setItems: React.Dispatch<React.SetStateAction<Items[]>>
}

interface NewItem {
  description: string
  dueDate: string
}

const ToDoList = (props: ListProps) => {
  const { selectedCategories, items } = props
  const ListItem = useRef<HTMLElement[]>([])
  const [newItem, setNewItem] = useState<NewItem>({ description: '', dueDate: '' })

  const UpdateStatus = async (element: HTMLElement) => {
    const item = items.find((item) => {
      const elementKey = element.getAttribute('id')
      if (elementKey === null) return
      return item.id.toString() === elementKey
    })
    if (item === undefined) return
    await PostToDoStatus(item)
  }

  // Handles crossing out the item when clicked

  const HandleCrossOut = (item: HTMLElement) => {
    item.setAttribute('class', 'listItemClicked')
    item.removeEventListener('click', () => {
      HandleCrossOut(item)
    })
    //setTimeout prevents double clicks on accident
    setTimeout(() => {
      item.addEventListener('click', () => {
        HandleUndo(item)
      })
    }, 250)

    UpdateStatus(item)
  }

  // Handles un-crossing out the item when clicked

  const HandleUndo = (item: HTMLElement) => {
    item.setAttribute('class', 'listItemAfter')
    item.removeEventListener('click', () => {
      HandleUndo(item)
    })
    //setTimeout prevents double clicks on accident
    setTimeout(() => {
      item.addEventListener('click', () => {
        HandleCrossOut(item)
      })
    }, 250)

    UpdateStatus(item)
  }

  // Adds the initial event listeners to the items

  useEffect(() => {
    if (ListItem.current.length === 0) return
    ListItem.current.map((item: HTMLElement) => {
      item.addEventListener('click', () => {
        if (item.getAttribute('class') === 'listItemClicked') {
          HandleUndo(item)
          return
        } else {
          HandleCrossOut(item)
        }
      })
    })
  }, [selectedCategories])

  // Renders the list

  const DateFormatter = (date: string) => {
    const test = date.split('T')[0].split('-')
    return `${test[1]}/${test[2]}/${test[0]}`
  }

  // Add new list item
  const handleNewDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem({ ...newItem, description: event.currentTarget.value })
  }

  const handleNewDueDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem({ ...newItem, dueDate: event.target.value })
  }

  const addNewItem = () => {
    if (!newItem.description || !newItem.dueDate) return
    const newItemId = items.length + 1
    const newItemCategory = selectedCategories[0]
    const newItems = [
      ...items,
      {
        id: newItemId,
        priority: newItemId,
        categoryId: newItemCategory.id,
        description: newItem.description,
        isDone: false,
        dueDate: newItem.dueDate,
      },
    ]
    setNewItem({ description: '', dueDate: '' })
    props.setItems(newItems)
    // const newItems = [...items, newItem]
    const newItemRef = ListItem.current[ListItem.current.length - 1]
    if (newItemRef) {
      newItemRef.addEventListener('click', () => {
        if (newItemRef.getAttribute('class') === 'listItemClicked') {
          HandleUndo(newItemRef)
          return
        } else {
          HandleCrossOut(newItemRef)
        }
      })
    }
    setNewItem({ description: '', dueDate: '' })
  }

  const Items = () => {
    const categoryElement = selectedCategories.map((category) => {
      const elements = items.map((item) => {
        if (item.categoryId !== category.id) return
        if (item.isDone) {
          return (
            <div
              key={item.id}
              id={item.id.toString()}
              className="listItemClicked"
              ref={(ref) => {
                if (ref === null) return
                ListItem.current.push(ref)
              }}
            >
              <h2 className="description">{item.description}</h2>
              <h2 className="dueDate">{DateFormatter(item.dueDate)}</h2>
            </div>
          )
        } else {
          return (
            <div
              key={item.description}
              className="listItem"
              id={item.id.toString()}
              ref={(ref) => {
                if (ref === null) return
                ListItem.current.push(ref)
              }}
            >
              <h2 className="description">{item.description}</h2>
              <h2 className="dueDate">{DateFormatter(item.dueDate)}</h2>
            </div>
          )
        }
      })
      return (
        <div className="category" key={category.id}>
          <h2 className="categoryName">{category.name}</h2>
          <div className="categoryHeaders">
            <h3 className="categorySubHeader">Task Name</h3>
            <h3 className="categorySubHeader">Due Date</h3>
          </div>
          <div className="toDoListContainer">
            <div className="createToDo">
              <CreateToDo
                handleNewDescription={handleNewDescription}
                handleNewDueDate={handleNewDueDate}
                addNewItem={addNewItem}
                description={newItem.description}
                dueDate={newItem.dueDate}
              />
            </div>
          </div>
          {elements}
        </div>
      )
    })
    return <div className="list">{categoryElement}</div>
  }

  return (
    <div className="listWrapper">
      <Items />
    </div>
  )
}

export default ToDoList
