import './App.scss';
import { useState, useEffect } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import NavBar from './components/Navbar/NavBar';

import Home from './pages/Home/Home';
import Info from './pages/Stream/Info/Info';
import Playlist from './pages/Stream/Playlist/Playlist';

import GetUserPlaylistInfo from './components/GetUserPlaylistInfo/GetUserPlaylistInfo';

import TwitchAuthBaseModel from './models/TwitchAuthBaseModel';
import UserPlaylistInfo from './models/UserPlaylistInfo';

function App(){
  const [loginUrl, setLoginUrl] = useState<string>("#");
  const [authBaseModel, setAuthBaseModel] = useState<TwitchAuthBaseModel>();
  const [userPlaylistInfo, setUserPlaylistInfo] = useState<UserPlaylistInfo>();
  
  return (
    <div className="appContent">
      <BrowserRouter>
        <NavBar AuthBaseModel={authBaseModel} LoginUrl={loginUrl} SetLoginUrlCallback={setLoginUrl} SetAuthModelCallback={setAuthBaseModel} />
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/stream/info">
          <Info />
        </Route>
        <Route exact path="/stream/playlist">
          <GetUserPlaylistInfo SetUserPlaylistInfoCallback={setUserPlaylistInfo} />
          <Playlist LoginUrl={loginUrl} UserPlaylistInfo={userPlaylistInfo} {...authBaseModel} />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
