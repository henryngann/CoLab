import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Input } from 'semantic-ui-react';
import {
    youtube_parser,
    getVideoType,
    isValidURL
} from '../../utils/video';
// import './Search.scss';
import SearchResults from './SearchResults/SearchResults';
import { store } from 'react-notifications-component';
import { TextField} from '@material-ui/core';
import moment from 'moment'

require('dotenv').config()

const VideoSearch = ({ addVideoToQueue, playVideoFromSearch, updateVideoProps }) => {
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [page, setPage] = useState(1);
    const [errSearch, setErrSearch] = useState("")
    const baseURL = 'https://www.googleapis.com/youtube/v3/videos';
    const lastSearch = useRef('');

    const handlePlay = async (event) => {
        event.preventDefault();
        let trimInput = searchInput.trim();
        if (trimInput === '' || trimInput === lastSearch.current) return;
        lastSearch.current = trimInput;
        if (isValidURL(trimInput)) {
            setErrSearch("")
            const videoType = getVideoType(trimInput);
            updateVideoProps({ videoType });
            switch (videoType) {
                case 'yt': getYTVideo(trimInput); break;
                default:
                    store.addNotification({
                        title: "Oh no!",
                        message: "We apologize. At the moment, only YouTube, Vimeo, and Twitch links are supported.",
                        type: "info",
                        insert: "top",
                        container: "bottom-right",
                        animationIn: ["animated", "fadeInUp"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 5000,
                            onScreen: false
                        }
                    });
                    break;
            }
        } else {
            setErrSearch('Invalid Youtube URL')
            // Search phrase on Youtub
            // search({ term: trimInput, page: 1 });
            // updateVideoProps({ videoType: 'yt' });
        }
    };
    /*
    const search = async ({ term, page = 1 }) => {
        const limit = (window.matchMedia('(max-width: 960px)').matches) ? 8 : 9;
        setLoading(true);
        axios.get(`${baseURL}/ytsearch`, {
            params: {
                query: term,
                page: page,
                limit: limit
            }
        }).then(response => {
            setSearchResults(response.data.results);
            setPage(page);
            setLoading(false);
        });
    };
    */
    const getYTVideo = async (ytUrl) => {
        const part = 'id,snippet,statistics'
        const id = youtube_parser(ytUrl);
        const key = process.env.REACT_APP_YOUTUBE_API_KEY
        setLoading(true);
        axios.get(`${baseURL}`, {
            params: { part, id, key }
        }).then(response => {
            setLoading(false);
            const searchItem = {
                "channel" : {
                    "url": `https://www.youtube.com/channel/${response.data.items[0].snippet.channelId}`,
                    "username": response.data.items[0].snippet.channelTitle,
                    "verified": false
                },
                "video" : {
                    "id": response.data.items[0].id,
                    "thumbnails": response.data.items[0].snippet.thumbnails.maxres.url,
                    "title": response.data.items[0].snippet.title,
                    "url": `https://www.youtube.com/watch?v=${response.data.items[0].id}`,
                    "upload_date": moment(response.data.items[0].snippet.publishedAt).fromNow(),
                    "views": response.data.items[0].statistics.viewCount
                }
            }
            playVideoFromSearch(searchItem);
        });
    }

    return (
        <div className="videoSearchContainer">
            <TextField
                placeholder='Paste Youtube Link Here!'
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' ? handlePlay(e) : null}
                disabled={loading}
                error={errSearch != ''}
                helperText={errSearch}
            />
            {/* <Input
                fluid
                id='searchInput'
                size='large'
                placeholder='Paste Youtube Link Here!'
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' ? handlePlay(e) : null}
                action={{
                    content: "Enter",
                    loading,
                    onClick: (e) => searchInput.trim() !== '' ? handlePlay(e) : null
                }}
            />
            <div>
                {errSearch}
            </div> */}
            {/*
            <SearchResults
                searchResults={searchResults}
                playVideoFromSearch={playVideoFromSearch}
                addVideoToQueue={addVideoToQueue}
                page={page}
                search={search}
                searchInput={searchInput}
                loading={loading}
            />
            */}

        </div>
    )
};

export default VideoSearch;