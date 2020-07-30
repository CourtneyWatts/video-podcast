import React from 'react'
import Video from '../Components/Video'
import { Animated } from 'react-animated-css'

import './PodcastList.css'

function PodcastList(props) {
  let linksToDisplay = props.videos.slice(0, 4)
  const list = linksToDisplay.map((video, idx) => (
    <Video
      selected={idx === 0 ? true : false}
      key={idx}
      title={video.title}
      published={video.published}
    />
  ))
  return (
    <div className='PodcastList'>
      <i className='fa fa-2x fa-chevron-up' aria-hidden='true'></i>
      <div className='PodcastList-container'>
        {list}
      </div>
      <i className='fa fa-2x fa-chevron-down' aria-hidden='true'></i>
    </div>
  )
}

export default PodcastList
