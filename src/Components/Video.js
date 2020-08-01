import React from 'react'
import { ReactComponent as CNNLogo } from '../images/CNN.svg'
import { Animated } from 'react-animated-css'
import './Video.css'

function Video(props) {
  let { selected, title, published } = props
  return (
    <Animated animationIn='fadeInUp'>
      <div className={`Video ${selected ? 'selected' : ''}`}>
        <div className='Video-Information'>
          <CNNLogo />
          <div>
            <p>{title}</p>
            <p className='published'>{published}</p>
          </div>
        </div>
      </div>
    </Animated>
  )
}

export default Video
