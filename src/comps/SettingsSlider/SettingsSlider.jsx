import React, { useEffect } from 'react'
import {useBackgroundImage} from '../../hooks'
import './SettingsSlider.css'
import { useOnClickOutside } from '../../hooks'

function SettingsSlider({ openSlider, setOpenSlider }) {
    const availableBgCategories = ['backgrounds', 'fashion', 'nature', 'science', 'education', 'feelings', 'health', 'people', 'religion', 'places', 'animals', 'industry', 'computer', 'food', 'sports', 'transportation', 'travel', 'buildings', 'business', 'music'];

    const settingsSliderRef = useOnClickOutside(() => setOpenSlider(false), openSlider);

    const {bgCategories, setBgCategoies} = useBackgroundImage()

    const bgCategoryHandler = (e, category) => {
        if(e.target.checked === true) {
            setBgCategoies([...bgCategories, category])
        } else {
            setBgCategoies([...bgCategories.filter((x) => x !== category)])
        }
    }
    
    useEffect(() => {
        localStorage.setItem("bgCategories", JSON.stringify(bgCategories))
    }, [bgCategories])

    const findDefaultCategory = (category) => {
        return bgCategories.find( x => x === category)
    }


  return (
    <div className={`SettingsSlider ${openSlider && 'open'}`} ref={settingsSliderRef}>
        <div className="SettingsSlider-wrapper flex-col justify-center align-start">
            {
                availableBgCategories.map((category) => {
                    return (
                        <label key={category} htmlFor={category} className="bgCategory-label flex-centered" onChange={(e) => bgCategoryHandler(e, category)}>
                            <input checked={findDefaultCategory(category)} type="checkbox" name="bgCategory" id={category} />
                            {category}
                        </label>
                    )
                })
            }
        </div>
    </div>
  )
}

export {SettingsSlider}