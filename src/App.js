import React from 'react'
import './App.css'
import VideoPodcast from './Components/VideoPodcast'

function App() {
  return (
    <div className='App'>
      <div className='small-screen-text'>
        <p>Browser window is too small</p>
        <p> If you are using a desktop browser, please resize your browser window. The app has beed designed with a width of 1280px and height of 720px</p>
      </div>
      <VideoPodcast />
    </div>
  )
}

export default App
