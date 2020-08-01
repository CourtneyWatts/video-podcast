import React, { Component } from 'react'
import convert from 'xml-js'
import './VideoPodcast.css'
import PodcastList from './PodcastList'
import PodcastVideoPlayer from './PodcastVideoPlayer'

const RIGHT_KEY = 'ArrowRight'
const LEFT_KEY = 'ArrowLeft'
const DOWN_KEY = 'ArrowDown'
const UP_KEY = 'ArrowUp'
const ENTER_KEY = 'Enter'




export class VideoPodcast extends Component {
  static defaultProps = {
    podcast: 'http://rss.cnn.com/services/podcasting/studentnews/rss.xml',
  }
  constructor(props) {
    super(props)
    this.state = {
      videos: [],
      focusedOnList: true,
      isLoading: true,
    }
    this.navUp = this.navUp.bind(this)
    this.navDown = this.navDown.bind(this)
    this.playPauseVideo = this.playPauseVideo.bind(this)
  }
  // Scrolling through list and loading the next video on up arrow
  navUp() {
    let videoArray = [...this.state.videos]
    let firstVideo = videoArray.pop()
    let newArray = [firstVideo, ...videoArray]
    this.setState({
      videos: newArray,
      selectedVideo: newArray[0],
    })
    document.querySelector('.btn i').style.display = 'block'
    document.getElementById('VideoPlayer').load()
  }
  // Scrolling through list and loading the next video on down arrow
  navDown() {
    let videoArray = [...this.state.videos]
    let lastVideo = videoArray.shift()
    let newArray = [...videoArray, lastVideo]
    this.setState({
      videos: newArray,
      selectedVideo: newArray[0],
    })
    document.querySelector('.btn i').style.display = 'block'
    document.getElementById('VideoPlayer').load()
  }
  // Toggling play and pause when enter is pressed, hiding and showing play button
  playPauseVideo() {
    //ignore enter key when focus is on list
    if (this.state.focusedOnList) {
      return
    }
    let videoPlayer = document.querySelector('#VideoPlayer')
    let playButton = document.querySelector('.btn i')
    playButton.classList.remove('highlight-play')
    if (videoPlayer.paused) {
      videoPlayer.play()
      playButton.style.display = 'none'
    } else {
      videoPlayer.pause()
      playButton.style.display = 'block'
    }
  }
  // highlighting selected sides of the app
  highlightSelection(key) {
    let leftSide = document.querySelector('.Video')
    let playButton = document.querySelector('.btn i')
    
    if (key === LEFT_KEY) {
      playButton.classList.remove('highlight-play')
      leftSide.classList.add('selected')
      
      // logic created to disable up/down scroll when the focus is not on the list
      if (!this.state.focusedOnList) {
        this.setState({
          focusedOnList: true,
        })
      }
    } else if (key === RIGHT_KEY) {
      leftSide.classList.remove('selected')
      playButton.classList.add('highlight-play')
      // logic created to disable up/down scroll when the focus is not on the list
      if (this.state.focusedOnList) {
        this.setState({
          focusedOnList: false,
        })
      }
    }
  }
  //Setting up event listeners for the key inputs
  setUpEventListeners() {
    window.addEventListener('keydown', (event) => {
      let key = event.key
      let { focusedOnList } = this.state
      event.preventDefault()
      if (key === DOWN_KEY && focusedOnList) {
        this.navDown()
      } else if (key === UP_KEY && focusedOnList) {
        this.navUp()
      } else if (key === LEFT_KEY || key === RIGHT_KEY) {
        this.highlightSelection(key)
      } else if (key === ENTER_KEY) {
        this.playPauseVideo()
      }
    })
    
  }

  componentDidMount() {
    this.setUpEventListeners()
    fetch(`https://cors-anywhere.herokuapp.com/${this.props.podcast}`)
      .then(function (resp) {
        return resp.text()
      })
      .then(function (data) {
        let results = convert.xml2js(data, {
          compact: true,
        }).rss.channel
        let videos = []
        for (let video of results.item) {
          //stripping out excess/unwanted markup
          let description = video.description._text.split('<div')[0]
          videos.push({
            title: video.title._text,
            description: description,
            category: video.category._text,
            published: video.pubDate._text,
            videoLink: video.link._text,
          })
        }
        return videos
      })
      .then((videos) => {
        let newArray = [...videos]
        this.setState({
          videos: newArray,
          selectedVideo: newArray[0],
          isLoading: false,
        })
      })
      .catch((error) => {
        this.setState({
          errorInFetch: true,
          isLoading: false,
        })
      })
  }
  render() {
    let { isLoading, videos, selectedVideo, errorInFetch } = this.state
    let content
    //Loading screen
    if (isLoading) {
      content = (
        <div className='Loading-screen'>
          <i className='fa-5x fa fa-spinner fa-spin'></i>
        </div>
      )
    } else if (errorInFetch) {
      content = (
        <div className='error-screen'>
          <i class="fas fa-3x fa-exclamation-triangle"></i><p>Oh No!</p><p>There seems to be an error fecthing the data, please try again.</p>
        </div>
      )
    } else {
      content = (
        <div className='PodcastContent'>
          <PodcastList videos={videos} />
          <PodcastVideoPlayer video={selectedVideo} />
        </div>
      )
    }
    return (
      <div className='VideoPodcast'>
        <div className='VideoPodcast-header'>
          <h1>Student News - Video Podcast</h1>
          <h4>
            CNN Student News utilizes CNN's worldwide resources to bring each
            day's top news stories to middle and high school classrooms. The
            10-minute, commercial-free program encourages student participation
            and provides classes with context for understanding current events.
          </h4>
        </div>
        {content}
      </div>
    )
  }
}

export default VideoPodcast
