import React from 'react'
import './Settings.css'
import {AiFillSetting} from '../../utils/getIcons';

function Settings() {
  return (
    <div className='Settings'>
        <AiFillSetting className='icon-setting' size="1.5em"/>
    </div>
  )
}

export { Settings }