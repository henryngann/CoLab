import React, { forwardRef } from "react";

import { Icon } from 'semantic-ui-react';
import { Slider, Rail, Tracks } from "react-compound-slider";
import { TooltipRail, SliderRail, Track } from "./Slider";
import { formatTimestamp } from '../../utils/video';
import {PlayArrow, Pause, VolumeOff, VolumeUp, VolumeDown, Fullscreen, FullscreenExit} from '@material-ui/icons';
import {IconButton} from '@material-ui/core'


const Controls = forwardRef(
  (
    {
      onSeekMouseDown,
      onSeekMouseUp,
      onRewind,
      onPlayPause,
      onFastForward,
      playing,
      onMute,
      muted,
      playbackRate,
      onPlaybackRateChange,
      onToggleFullScreen,
      volume,
      onVolumeChange,
      currentTime,
      duration,
      isFullscreen,
      seeking,
      jumpedTime,
      videoType
    },
    ref
  ) => {

    const sliderStyle = {
      position: "relative",
      width: "100%"
    };
    const controlIcon = {
      fill: "white"
    };
    return (
      <div ref={ref} className="controlsContainer">
        {duration &&
          <div className="controls">
            <IconButton
              onClick={onPlayPause}
              size="small"
              title="Play/Pause">
              {playing ? <Pause style={controlIcon}/> : <PlayArrow style={controlIcon}/>}
            </IconButton>

            {!['twitch'].includes(videoType) &&
              <div className="timestamps elapsed" style={{ width: duration > 3600 ? '50px' : '40px' }}>
                <span>{seeking ? formatTimestamp(jumpedTime) : formatTimestamp(currentTime)}</span>
              </div>
            }
            <div className='seekSlider'>
              {!['twitch'].includes(videoType) &&
                <Slider
                  mode={1}
                  step={1}
                  domain={[0, +duration]}
                  rootStyle={sliderStyle}
                  // onSlideStart={onSeekMouseDown}
                  onSlideEnd={onSeekMouseUp}
                  values={seeking ? [jumpedTime] : [currentTime]}
                >
                  <Rail>
                    {(railProps) => <TooltipRail {...railProps} />}
                  </Rail>
                  <Tracks right={false}>
                    {({ tracks, getTrackProps }) => (
                      <div>
                        {tracks.map(({ id, source, target }) => (
                          <Track
                            key={id}
                            source={source}
                            target={target}
                            getTrackProps={getTrackProps}
                          />
                        ))}
                      </div>
                    )}
                  </Tracks>
                </Slider>
              }
            </div>
            {!['twitch'].includes(videoType) &&
              <div className="timestamps total">
                <span>{formatTimestamp(duration)}</span>
              </div>
            }
            <IconButton
              onClick={onMute}
              size="small"
              title="Mute">
              {muted ? <VolumeOff style={controlIcon}/> : (volume > 0.5 ? <VolumeUp style={controlIcon}/> : <VolumeDown style={controlIcon}/>)}
            </IconButton>

            <div className='volumeSlider'>
              <Slider
                mode={1}
                step={0.1}
                domain={[0, 1]}
                rootStyle={sliderStyle}
                onUpdate={onVolumeChange}
                // onChange={this.onVolumeChange}
                values={[muted ? 0 : volume]}
              >
                <Rail>
                  {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
                </Rail>
                <Tracks right={false}>
                  {({ tracks, getTrackProps }) => (
                    <div>
                      {tracks.map(({ id, source, target }) => (
                        <Track
                          key={id}
                          source={source}
                          target={target}
                          getTrackProps={getTrackProps}
                        />
                      ))}
                    </div>
                  )}
                </Tracks>
              </Slider>
            </div>
            <IconButton
              onClick={onToggleFullScreen}
              size="small"
              title="Fullscreen">
              {isFullscreen ? <FullscreenExit style={controlIcon}/> : <Fullscreen style={controlIcon}/>}
            </IconButton>
          </div>
        }
      </div >
    );
  }
);

export default Controls;
