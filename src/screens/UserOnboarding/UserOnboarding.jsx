import React, { useEffect, useRef, useState } from 'react'
import './UserOnboarding.css';

function UserOnboarding({userName, setUserName}) {
  const onboardInputRef = useRef(null);

  const userNameHandler = (e) => {
    e.preventDefault();
    setUserName(onboardInputRef.current.value);
  }
  
  return (
    <form className='UserOnboarding flex-centered flex-col' onSubmit={(e) => userNameHandler(e)}>
        <h1 className="onboaring-title">Hello, what's your name?</h1>
        <input ref={onboardInputRef} defaultValue={userName} type="text" className='onboaring-input' autoFocus/>
    </form>
  )
}

export {UserOnboarding}