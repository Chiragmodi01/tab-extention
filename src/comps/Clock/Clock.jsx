import React, { useEffect, useState } from 'react'
import './Clock.css';
import {CgArrowsExchangeAlt, RiFocus2Line, RiFocus2Fill, IoMdClose, AiOutlineEdit} from '../../utils/getIcons';

function Clock({setShowConfetti}) {
    const [time, setTime] = useState('');
    const [format24, setFormat24] = useState(false);
    const [focus, setFocus] = useState('');
    const [addFocusStyles, setAddFocusStyles] = useState(false);
    const [focusDone, setFocusDone] = useState(false);

    const timeFunction = () => {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const currentTime = format24  ? `${hours}:${minutes}` : `${(hours % 12) || 12}:${minutes}` ;
        setTime(currentTime);
    }
    useEffect(() => {
        timeFunction()
    })
    useEffect(() => {
        localStorage.setItem('timeFormat', format24 ? '24 hrs' : '12hrs');
    }, [format24])

    const focusSubmitHandler = (e) => {
        e.preventDefault();
        localStorage.setItem('focus', focus);
        focus && setAddFocusStyles(true);
    }

    const IconFocus = focusDone ? RiFocus2Fill : RiFocus2Line

    const focusCloseHandler = () => {
        localStorage.removeItem('focusDone')
        setAddFocusStyles(false);
        setFocusDone(false);
        setFocus('');
        localStorage.removeItem('focus');
    }
    
    const focusEditHandler = () => {
        localStorage.setItem('focusDone', false)
        setAddFocusStyles(false);
        setFocusDone(false);
    }

    const focusDoneHandler = () => {
        setFocusDone(prev => !prev);
        !focusDone ? localStorage.setItem('focusDone', true) : localStorage.setItem('focusDone', false);
        !focusDone && setShowConfetti(prev => !prev);
        !focusDone && setTimeout(() => {
            setShowConfetti(false);
        }, 2000)
    }

  return (
    <div className='Clock flex-centered flex-col'>
        <div className="Clock-time flex-centered">
            {time}
            <span className="clock-ghost-icon-wrapper flex-centered">
                <CgArrowsExchangeAlt size=".23em" className='icon-switch' onClick={() => setFormat24(prev => !prev)}/>
                <span className="clock-ghost-tooltip">
                    Switch to {format24 ? 12 : 24}-hour clock
                </span>
            </span>
        </div>
        <div className="greetings-wrapper">
            <p className="greetings-text">Good afternoon, <span className="user-name">chirag.</span></p>
        </div>
        <div className="focus-wrapper flex-centered flex-col">
            <p className="focus-text">{addFocusStyles ? 'Focus of the Day :' : 'What\'s your main focus for today?'}</p>
            <form className={`focus-input-wrapper ${addFocusStyles && 'no-border'} flex-centered`} onSubmit={(e) => focusSubmitHandler(e)}>
                {addFocusStyles ? 
                <label htmlFor="focus" className={`focus-input checkbox ${focusDone && 'focusDone'} flex-centered`}>
                    <input onChange={focusDoneHandler} type="checkbox" name="focus" id="focus" />
                    <p className="focus-input-label">
                        <IconFocus className='icon-focus'/>
                    {focus}</p>
                    <span className="focus-icons-wrapper flex-centered">
                        <AiOutlineEdit size=".65em" className='icon-edit' onClick={focusEditHandler}/>
                        <IoMdClose size=".65em" className='icon-close' onClick={focusCloseHandler}/>
                    </span>
                </label> : 
                <input value={focus} type="text" className='focus-input' onChange={(e) => setFocus(e.target.value)}/>
                }
            </form>
        </div>
    </div>
  )
}

export {Clock}