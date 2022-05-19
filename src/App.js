import './App.css';
import { useBackgroundImage } from './hooks';
import { Main } from './screens';

function App() {
  const {bgURL} = useBackgroundImage();

  return (
    <div className="App" style={{background: `url(${bgURL}) center center/cover no-repeat`}}>
      <Main />
    </div>
  );
}

export default App;
