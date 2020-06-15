import React from 'react';
import YouTube from 'react-youtube';
 
export default class YouTubeVideo extends React.Component {

    constructor(){
        super();
    }

  render() {
    const opts = {
      height: '100%',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
      },
    };
    const {videoId} = this.props;

    return <YouTube containerClassName="player"
                    videoId={videoId} 
                    opts={opts} 
                    onStateChange={this._onStateChange.bind(this)}
                    onReady={this._onReady.bind(this)} />;
  }
 
  _onReady(event) {
    // access to player in all event handlers via event.target
        event.target.seekTo(this.props.time)
        if(this.props.status === 2){
            event.target.pauseVideo();
        } else if (this.props.status === 1){
          event.target.playVideo();
        }
        this.props.onPlayerReady(event);
  }

  _onStateChange(event){
    this.props.stateChange(event)
  }
}