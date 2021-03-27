import React, { useEffect } from "react";
import { Button, Divider, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import { sckt } from '../Socket';
import './Video.scss';
import { insert } from '../utils/video';
import VideoSearch from './Search/Search';
import VideoPlayer from "./Player/Player";



const Video = ({ log, name, room, videoProps, updateVideoProps, playerRef, sendVideoState, loadVideo, playVideoFromSearch }) => {
    const loadFromQueue = (queue, sync = false) => {
        let nextVideo = queue.shift(); // Remove from beginning of queue
        if (nextVideo !== undefined) {
            loadVideo(nextVideo, sync);
            updateVideoProps({ queue });
            updateVideoProps({ history: [nextVideo, ...videoProps.history] });
        }
    }
    const modifyVideoState = (paramsToChange) => {
        if (playerRef.current !== null) {
            const { playing, seekTime, playbackRate } = paramsToChange;
            if (playing !== undefined) {
                updateVideoProps({ playing });
                // } else if (playbackRate !== undefined) {
                //     player.setPlaybackRate(playbackRate);
            }
            if (seekTime !== undefined) {
                playerRef.current.seekTo(seekTime);
            }
        }
    }
    const addVideoToQueue = (searchItem) => {
        let { queue } = videoProps;
        let updatedQueue = insert(queue, queue.length, searchItem)
        sendVideoState({
            eventName: "syncQueue",
            eventParams: {
                queue: updatedQueue,
                type: "add"
            }
        });
        updateVideoProps({ queue: updatedQueue });
    }

    useEffect(() => {
        // Send videoProps to new user
        const getSyncHandler = ({ id }) => {
            log("New user needs videoProps to sync.", 'server');
            if (playerRef.current !== null) {
                let params = {
                    id: id,
                    ...videoProps,
                    seekTime: playerRef.current.getCurrentTime(),
                    receiving: true
                }
                sckt.socket.emit('sendSync', params, (error) => { });
            }
        }
        sckt.socket.on("getSync", getSyncHandler);
        return () => {
            sckt.socket.off('getSync', getSyncHandler);
        };
    });
    useEffect(() => {
        // Sync other user's videoProps to our state
        const startSyncHandler = (videoProps) => {
            console.log("I'm syncing.", 'server');
            updateVideoProps({ ...videoProps });
            modifyVideoState({ ...videoProps });
            // loadVideo(videoProps.history[0], true);
        };
        // Update single value in videoProps from other user
        const receiveVideoStateHandler = ({ name, room, eventName, eventParams = {} }) => {
            const { seekTime, playbackRate, queue, searchItem, history } = eventParams;
            updateVideoProps({ receiving: true });
            switch (eventName) {
                case 'syncPlay':
                    updateVideoProps({ playing: true });
                    modifyVideoState({ playing: true });
                    break;
                case 'syncSeek':
                    updateVideoProps({ seekTime });
                    modifyVideoState({ seekTime });
                    break;
                case 'syncPause':
                    updateVideoProps({ playing: false, seekTime });
                    modifyVideoState({ playing: false, seekTime });
                    break;
                case 'syncRateChange':
                    updateVideoProps({ playbackRate });
                    modifyVideoState({ playbackRate });
                    break;
                case 'syncLoad':
                    loadVideo(searchItem, false);
                    updateVideoProps({ history });
                    break;
                case 'syncLoadFromQueue':
                    loadFromQueue(queue);
                    break;
                case 'syncQueue':
                    updateVideoProps({ queue });
                    break;
                default:
                    break;
            }
        };

        sckt.socket.on("startSync", startSyncHandler);
        sckt.socket.on("receiveVideoState", receiveVideoStateHandler);
        return () => {
            sckt.socket.off('startSync', startSyncHandler);
            sckt.socket.off('receiveVideoState', receiveVideoStateHandler);
        };
    }, []);

    // useEffect(() => {
    //     console.log(videoProps.playing);
    // }, [videoProps.playing])

    return (
        <div className="videoContainer">
            <VideoPlayer
                videoProps={videoProps}
                sendVideoState={sendVideoState}
                updateVideoProps={updateVideoProps}
                playerRef={playerRef}
                loadVideo={loadVideo}
                loadFromQueue={loadFromQueue}
            />
            <VideoSearch
                addVideoToQueue={addVideoToQueue}
                playVideoFromSearch={playVideoFromSearch}
                updateVideoProps={updateVideoProps}
            />
        </div>
    );
}

export default Video;