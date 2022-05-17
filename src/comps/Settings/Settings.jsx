import React from 'react'
import './Settings.css'
import {AiFillSetting} from '../../utils/getIcons';
import { SettingsSlider } from '../../comps';

function Settings({ openSlider, setOpenSlider }) {


  return (
    <div className='Settings'>
        {!openSlider && <AiFillSetting className='icon-setting' size="1.5em" onClick={() => setOpenSlider(prev => !prev)}/>}
        <SettingsSlider openSlider={openSlider} setOpenSlider={setOpenSlider}/>
    </div>
  )
}

export { Settings }