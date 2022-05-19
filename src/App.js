import { useEffect, useState } from 'react';
import './App.css';
import { useBackgroundImage, useFetchLocalStorage } from './hooks';
import { Main, UserOnboarding } from './screens';

function App() {
  const {bgURL} = useBackgroundImage();
  const [userName, setUserName] = useState('');
  const {getData} = useFetchLocalStorage('userName', setUserName, false);
  
  return (
    <div className="App" style={{background: `url(${bgURL}) center center/cover no-repeat`}}>
      {userName ? <Main userName={userName}/> :
      <UserOnboarding userName={userName} setUserName={setUserName}/>}
    </div>
  );
}

export default App;
