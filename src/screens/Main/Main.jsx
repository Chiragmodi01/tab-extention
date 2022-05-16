import React from 'react'
import './Main.css';
import {useBackgroundImage} from '../../hooks'
import { Settings, Search } from '../../comps'

function Main() {
  const bgURL = useBackgroundImage();

  return (
    <main className='Main-screen' style={{background: `url(${bgURL}) center center/cover no-repeat`}}>
        <Settings />
        <Search />
    </main>
  )
}

export {Main}