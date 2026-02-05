import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {VerifyCodeComponent,SearchScoreComponent} from './utils/api.jsx';

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <div id="verify-code-container">
        <VerifyCodeComponent />
      </div>
        <SearchScoreComponent />
    </>
  );
}

export default App
