import React, { useEffect, useState } from 'react'
import './Clock.css';
import {CgArrowsExchangeAlt, RiFocus2Line, RiFocus2Fill, IoMdClose, AiOutlineEdit} from '../../utils/getIcons';

function Clock({setShowConfetti, userName}) {
    const focusState = "focus" in localStorage ? localStorage.getItem('focus') : '';
    const focusDoneState = "focusDone" in localStorage ? JSON.parse(localStorage.getItem('focusDone')) : false;
    const timeFormat24State = "isTimeFormat24" in localStorage ?  JSON.parse(localStorage.getItem('isTimeFormat24')) : false;

    const [time, setTime] = useState('');
    const [format24, setFormat24] = useState(timeFormat24State);
    const [focus, setFocus] = useState(focusState);
    const [addFocusStyles, setAddFocusStyles] = useState(false);
    const [focusDone, setFocusDone] = useState(focusDoneState);

    const timeFunction = () => {
        let date = new Date();
        let hours = date.getHours();
        let minutes = ('0'+date.getMinutes()).slice(-2);
        const currentTime = format24  ? `${hours}:${minutes}` : `${(hours % 12) || 12}:${minutes}` ;
        setTime(currentTime);
    }

    const greetingMessage = () => {
        const time = new Date().getHours();
        if(time < 12) {
            return 'morning'
        } else if(time < 18) {
            return 'afternoon'
        } else {
            return 'evening'
        }
    }

    const focusSubmitHandler = (e) => {
        e.preventDefault();
        localStorage.setItem('focus', focus);
        focus && setAddFocusStyles(true);
    }

    
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

    const timeFormatHandler = () => {
        setFormat24(prev => !prev);
        localStorage.setItem('isTimeFormat24', !format24);
    }
    
    useEffect(() => {
        focus && setAddFocusStyles(true);
    }, [])

    useEffect(() => {
        timeFunction()
    })
    

    const IconFocus = focusDone ? RiFocus2Fill : RiFocus2Line;

    
    return (
        <div className='Clock flex-centered flex-col'>
        <div className="Clock-time flex-centered">
            {time}
            <span className="clock-ghost-icon-wrapper flex-centered">
                <CgArrowsExchangeAlt size=".23em" className='icon-switch' onClick={timeFormatHandler}/>
                <span className="clock-ghost-tooltip">
                    Switch to {format24 ? 12 : 24}-hour clock
                </span>
            </span>
        </div>
        <div className="greetings-wrapper">
            <p className="greetings-text">Good {greetingMessage()}, <span className="user-name">{userName}.</span></p>
        </div>
        <div className="focus-wrapper flex-centered flex-col">
            <p className={`focus-text ${addFocusStyles && 'short-font'}`}>{addFocusStyles ? 'TODAY :' : 'What\'s your main focus for today?'}</p>
            <form className={`focus-input-wrapper ${addFocusStyles && 'no-border'} flex-centered`} onSubmit={(e) => focusSubmitHandler(e)}>
                {addFocusStyles ? 
                <label htmlFor="focus" className={`focus-input checkbox ${focusDone && 'focusDone'} flex-centered`}>
                    <input onChange={focusDoneHandler} type="checkbox" name="focus" id="focus" />
                    <p className="focus-input-label">
                        <IconFocus className='icon-focus'/>
                    {focus}</p>
                    <span className="focus-icons-wrapper flex-centered">
                        <AiOutlineEdit size=".85em" className='icon-edit' onClick={focusEditHandler}/>
                        <IoMdClose size=".85em" className='icon-close' onClick={focusCloseHandler}/>
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