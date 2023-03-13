import React, { useState } from 'react'
import Logo from '../../assets/logo.png'

const Navbar = () => {
  const [isOpen, setOpen] = useState(false)

  const ToggleSortMenu = () => {
    setOpen(!isOpen)
  }

  return (
    <div className={'header-wrapper'}>
      <div className="header-content-left">
        <div className="logo-wrapper">
          <img src={Logo} alt="chameleon logo" />
        </div>
        <div className="title-wrapper">
          <h1>Emerald Chameleons</h1>
        </div>
      </div>

      <div className="sort-wrapper">
        <div className="sort">
          <button className={isOpen ? 'dots on' : 'dots'} onClick={ToggleSortMenu}><span></span></button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
