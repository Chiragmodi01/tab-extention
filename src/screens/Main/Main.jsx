import React, {useEffect, useState} from 'react'
import './Main.css';
import {useBackgroundImage} from '../../hooks'
import { Settings, Search } from '../../comps'

function Main() {
  const {bgURL, bgCategories, setBgCategoies} = useBackgroundImage();
  const [openSlider, setOpenSlider] = useState(false);

  
  // useEffect(() => {
  //   const localBgCategories = JSON.parse(localStorage.getItem("bgCategories"));
  //   setBgCategoies([...bgCategories, localBgCategories]);
  // }, [bgCategories])

  return (
    <main className='Main-screen' style={{background: `url(${bgURL}) center center/cover no-repeat`}}>
        <Settings openSlider={openSlider} setOpenSlider={setOpenSlider}/>
        {!openSlider && <Search />}
    </main>
  )
}

export {Main}