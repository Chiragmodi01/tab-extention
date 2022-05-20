import React, { useState } from 'react'
import './Search.css'
import {FiSearch, AiOutlineGoogle} from '../../utils/getIcons'
import {useOnClickOutside} from '../../hooks';

function Search({openSlider}) {
    const [searchIcon, setSearchIcon] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputsRef = useOnClickOutside(() => setSearchIcon(false), searchIcon)

    const searchLocation = `https://www.google.com/search?q=${searchQuery}`;

    const searchInputFocusHandler = () => {
        setSearchIcon(true)
    }

    const submitSearchHandler = (e) => {
        e.preventDefault();
        window.location.href = searchLocation;
    }
    
    const searchInputHandler = (e) => {
        setSearchQuery(e.target.value);
    }

    const IconSearch = searchIcon ? AiOutlineGoogle : FiSearch;

  return (
    <div className={`Search ${openSlider && 'hidden'}`} ref={searchInputsRef}>
        <form className="Search-container flex-centered" onSubmit={(e) => submitSearchHandler(e)}>
            <IconSearch size="1.25em" className='icon-search'/>
            <input value={searchQuery} onChange={(e) => searchInputHandler(e)} type="text" className="search-input flex-centered" placeholder='Google Search' onFocus={searchInputFocusHandler}/>
        </form>
    </div>
  )
}

export { Search }