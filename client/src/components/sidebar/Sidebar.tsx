import { useRef } from 'react'
import { Categories } from '../../../types/data'
import '../css/_sidebar.scss'
import AddCategory from '../addCategory/AddCategory'
import { DeleteEntry } from '../deleteItem/DeleteEntry'

type SidebarProps = {
  selectedCategories: Categories[]
  setSelectedCategories: (value: Categories[]) => void
  categories: Categories[]
  setCategories: (value: Categories[]) => void
}

export default function Sidebar(props: SidebarProps) {
  const { selectedCategories, setSelectedCategories, categories, setCategories } =
    props
  const allButtonRef = useRef<HTMLButtonElement>(null)
  const categoryUrl =
    'https://todobackend20230309204702.azurewebsites.net/api/category'

  function addActiveClass(target: HTMLElement) {
    target.classList.add('active')
  }

  function removeActiveClass(target: HTMLElement) {
    target.classList.remove('active')
  }

  function filterCategories(e: React.MouseEvent<HTMLButtonElement>) {
    const target = e.target as HTMLButtonElement
    const targetCategoryId = Number(target.id.split('-')[1])
    if (target.classList.contains('active')) {
      removeActiveClass(target)
      const newCategories = selectedCategories.filter(
        (cat) => cat.id !== targetCategoryId
      )
      setSelectedCategories(newCategories)
    } else {
      addActiveClass(target)
      const newCategories = selectedCategories.concat(
        categories.filter((cat) => cat.id === targetCategoryId)
      )
      setSelectedCategories(newCategories)
    }
  }

  const HandleAllFilter = () => {
    const allButtons = document.querySelectorAll('.category-sidebar')
    if (selectedCategories.length === categories.length) {
      allButtons.forEach((button) => removeActiveClass(button as HTMLElement))
      setSelectedCategories([])
    } else {
      allButtons.forEach((button) => addActiveClass(button as HTMLElement))
      setSelectedCategories(categories)
    }
  }

  return (
    <nav className="sidebar">
      <h2>Categories</h2>
      <div className="category-list">
        <button
          className="category-sidebar"
          id="category-all"
          onClick={HandleAllFilter}
          ref={allButtonRef}
        >
          All
        </button>
        {categories.map((cat) => {
          return (
            <div className="category-item-container" key={cat.name}>
              <button
                className={`category-sidebar ${
                  selectedCategories.includes(cat) ? 'active' : ''
                }`}
                onClick={filterCategories}
                id={`${cat.name}-${cat.id}`}
              >
                {cat.name}
              </button>
              <DeleteEntry
                id={cat.id}
                itemType="category"
                items={categories}
                setItems={setCategories}
              />
            </div>
          )
        })}
      </div>
      <AddCategory />
    </nav>
  )
}
