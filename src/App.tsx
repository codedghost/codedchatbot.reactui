import './App.scss'
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import 'bootstrap-icons/font/bootstrap-icons.css'

import NavBar from './components/Navbar/NavBar'

import Home from './pages/Home/Home'
import Playlist from './pages/Stream/Playlist/Playlist'
import Counter from './pages/Stream/Counter/Counter'
import ModerationSearch from './pages/Moderation/Search/Search'
import TransferUser from './pages/Moderation/TransferUser/TransferUser'

import Quotes from './pages/Stream/Quotes/Quotes'

import GetUserPlaylistInfo from './components/GetUserPlaylistInfo/GetUserPlaylistInfo'

import TwitchAuthBaseModel from './models/TwitchAuthBaseModel'
import UserPlaylistInfo from './models/UserPlaylistInfo'

function App() {
    const [loginUrl, setLoginUrl] = useState<string>('#')
    const [authBaseModel, setAuthBaseModel] = useState<TwitchAuthBaseModel>()
    const [userPlaylistInfo, setUserPlaylistInfo] = useState<UserPlaylistInfo>()

    return (
        <div className="appContent">
            <BrowserRouter>
                <NavBar
                    AuthBaseModel={authBaseModel}
                    LoginUrl={loginUrl}
                    SetLoginUrlCallback={setLoginUrl}
                    SetAuthModelCallback={setAuthBaseModel}
                />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/stream/playlist"
                        element={
                            <>
                                <GetUserPlaylistInfo
                                    SetUserPlaylistInfoCallback={
                                        setUserPlaylistInfo
                                    }
                                />
                                <Playlist
                                    LoginUrl={loginUrl}
                                    UserPlaylistInfo={userPlaylistInfo}
                                    {...authBaseModel}
                                />
                            </>
                        }
                    />
                    <Route
                        path="/stream/quotes"
                        element={<Quotes {...authBaseModel} />}
                    />
                    <Route
                        path="/stream/counter/:counterName"
                        element={<Counter />}
                    />
                    <Route
                        path="/moderation/search"
                        element={
                            authBaseModel?.isModerator ? (
                                <ModerationSearch {...authBaseModel} />
                            ) : (
                                <></>
                            )
                        }
                    />
                    <Route
                        path="/moderation/transfer-user"
                        element={
                            authBaseModel?.isModerator ? (
                                <TransferUser />
                            ) : (
                                <></>
                            )
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
