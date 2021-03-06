import {Alert} from 'react-bootstrap';
import UserPlaylistInfo from '../../../models/UserPlaylistInfo';
import { IsNullOrWhiteSpace } from '../../../services/StringHelperService';
import { useEffect, useState } from 'react';

import PlaylistHeaderProps from './PlaylistHeaderProps';

function PlaylistHeader(props: PlaylistHeaderProps) {
    const [totalVips, updateTotalVips] = useState<number>(0);

    useEffect(() => {
        if(props.hubConnection !== undefined) {
            props.hubConnection.on("UpdateVips", (vipTotal) => {
                updateTotalVips(vipTotal);
            });
        }
    }, [props.hubConnection]);

    useEffect(() => {
        updateTotalVips(props.UserPlaylistInfo.vips);
    }, [props.UserPlaylistInfo.vips])

    const loggedOutContent = (
        <div>
            <Alert.Link href={props.LoginUrl}>Login</Alert.Link> with Twitch to access playlist features!
        </div>
    );

    const loggedInContent = (
        <div>
            Welcome {props.username}! {props.isModerator ? "You are a moderator, gg!" : ""} You have {totalVips} VIP tokens!
        </div>
    )
    
    console.log("username:" + props.username);
    return (
        <Alert key="playlist-header" variant="dark">
            {IsNullOrWhiteSpace(props?.username) === true ? loggedOutContent : loggedInContent}
        </Alert>
    );
}

PlaylistHeader.defaultProps = {
    username: "",
    LoginUrl: "#",
    UserPlaylistInfo: {
        vips: 0
    } as UserPlaylistInfo
} as PlaylistHeaderProps;

export default PlaylistHeader;