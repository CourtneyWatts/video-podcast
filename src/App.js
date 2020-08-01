import React from 'react'
import './App.css'
import VideoPodcast from './Components/VideoPodcast'

function App() {
  return (
    <div className='App'>
      <div className='small-screen-text'>
        <p>Browser window is too small</p>
        <p> If you are using a desktop browser, please resize your browser window.</p>
      </div>
      <VideoPodcast />
    </div>
  )
}

export default App
