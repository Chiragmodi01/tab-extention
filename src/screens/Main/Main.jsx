import React, {useEffect, useRef, useState} from 'react'
import './Main.css';
import {useBackgroundImage} from '../../hooks'
import { Settings, Search, Clock } from '../../comps'
import Confetti from 'react-confetti';

function Main() {
  const {bgURL, bgCategories, setBgCategoies} = useBackgroundImage();
  const [openSlider, setOpenSlider] = useState(false);
  const confettiRef = useRef(null);
  const [confettiHeight, setConfettiHeight] = useState(null);
  const [confettiWidth, setConfettiWidth] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setConfettiHeight(confettiRef.current.clientHeight);
    setConfettiWidth(confettiRef.current.clientWidth);
  }, [])
  console.log(showConfetti)

  
  // useEffect(() => {
  //   const localBgCategories = JSON.parse(localStorage.getItem("bgCategories"));
  //   setBgCategoies([...bgCategories, localBgCategories]);
  // }, [bgCategories])

  return (
    <main ref={confettiRef} className='Main-screen'>
        <Settings openSlider={openSlider} setOpenSlider={setOpenSlider}/>
        {!openSlider && <Search />}
        <Clock setShowConfetti={setShowConfetti}/>
        <Confetti width={confettiWidth} height={confettiHeight} numberOfPieces={showConfetti ? 500 : 0} onConfettiComplete={() => setShowConfetti(false)} recycle={showConfetti} gravity={0.09} wind={0.01}/>
    </main>
  )
}

export {Main}