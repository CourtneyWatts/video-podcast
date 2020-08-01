import React from 'react'
import './PodcastVideoPlayer.css'

function PodcastVideoPlayer(props) {
  let { description, videoLink, title } = props.video
  return (
    <div className='PodcastVideo'>
      <div className='PodcastContent-Video'>
        {/* <embed src={videoLink} /> */}
        <video width='100%' height='100%' id='VideoPlayer'>
          <source src={videoLink} type='video/mp4' />
        </video>
        <div className='btn'>
          <i className='fa-4x far fa-play-circle'></i>
        </div>
      </div>
      <div className='PodcastContent-Description'>
        <p>{title}</p>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default PodcastVideoPlayer
