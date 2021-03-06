import { useEffect, useState } from 'react';
import ListProps from './ListProps';
import { AnimateSharedLayout } from "framer-motion";
import { PlaylistState } from '../../../services/PlaylistService/PlaylistServiceInterfaces';
import { GetPlaylist } from '../../../services/PlaylistService/PlaylistService';
import SongItem from './SongItem/SongItem';
import PlaylistHeader from './PlaylistHeader/PlaylistHeader';

import { IsNullOrWhiteSpace } from '../../../services/StringHelperService';

import './List.scss';
import UserPlaylistInfo from '../../../models/UserPlaylistInfo';

function List(props: ListProps) {
    const [playlist, updatePlaylist] = useState<PlaylistState>({} as PlaylistState);
    const [playlistState, setPlaylistState] = useState<string>("Closed");

    useEffect(() => {
        // Get initial Playlist State
        GetPlaylist().then((data) => {
            updatePlaylist({...data} as PlaylistState);
        });
    }, []);

    useEffect(() => {
        if(props.hubConnection !== undefined) {
            props.hubConnection.on("UpdateClients", (currentSong, regularQueue, vipQueue) => {
                var playlistState = {currentSong: currentSong, regularQueue: regularQueue, vipQueue: vipQueue} as PlaylistState;
        
                updatePlaylist(playlistState);
            });

            props.hubConnection.on("PlaylistState", (newState) => {
                console.log(newState);
                var castNewState = newState as string;
                setPlaylistState(castNewState)
            });

            props.hubConnection.on("Heartbeat", () => {
                console.log("conn alive");
            });
        }
    }, [props.hubConnection]);

    useEffect(() => {
        setPlaylistState(props.UserPlaylistInfo.playlistState);
    }, [props.UserPlaylistInfo.playlistState])

    var vipRequestRender = playlist.vipQueue !== undefined ? playlist.vipQueue.map((r) => (
            <SongItem songRequest={r} {...props} isCurrent={false} isRegular={false} />
    )) : [];

    var regularRequestRender = playlist.regularQueue !== undefined ?  playlist.regularQueue.map((r) => (
            <SongItem songRequest={r} {...props} isCurrent={false} isRegular={true} />
    )) : [];

    return (
        <div>
            <AnimateSharedLayout>
                <div className="current">
                    <PlaylistHeader HeaderText={`Current Song (Playlist is ${(IsNullOrWhiteSpace(playlistState) ? "" : playlistState).toUpperCase()})`} />
                    <div className="song-container">
                        <SongItem songRequest={playlist.currentSong} {...props} isCurrent={true} isRegular={false} />
                    </div>
                </div>
                
                <div className="row lists-container">
                    <div className="col-6 vip-container">
                        <PlaylistHeader HeaderText="VIP Song Requests" />
                        <div className="queue-container">
                            {vipRequestRender}
                        </div>
                    </div>
                    <div className="col-6 regular-container">
                        <PlaylistHeader HeaderText="Song Requests" />
                        <div className="queue-container">
                            {regularRequestRender}
                        </div>
                    </div>
                </div>
            </AnimateSharedLayout>
            <pre >{JSON.stringify(playlist, null, 2)}</pre>
        </div>
    )
}

List.defaultProps = {
    username: '',
    isModerator: false,
    UserPlaylistInfo: {} as UserPlaylistInfo
} as ListProps

export default List;