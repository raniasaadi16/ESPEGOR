import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';
import './Papp.css';
import './Fapp.css';
import './AuthStyle.css';
import './FrStyle.css';

import {
  BrowserRouter as Router,
  Switch, 
  Route,
} from 'react-router-dom';


import { PrivateRouteAdmin } from './Components/PrivateRouteAdmin';


import { Dashboard } from './AdminPanel/Dashoard/Dashboard';
import { Competition } from './AdminPanel/Competitions/Competition';
import { Game } from './AdminPanel/Games/Game';
import { Player } from './AdminPanel/Players/Player';
import { Token } from './AdminPanel/Tokens/Token';
import { Offer } from './AdminPanel/Offers/Offer';
import { CompetitionDetail } from './AdminPanel/Pages/CompetitionDetail';
import { GameDetail } from './AdminPanel/Pages/GameDetail';
import { PlayerDetail } from './AdminPanel/Pages/PlayerDetail';
import { GroupDetail } from './AdminPanel/Pages/groupDetail';
import { Group } from './AdminPanel/Groups/Group';



import { Login } from './GamerPanel/Login/Login';


import Upcoming from './GamerPanel/upcoming/upcoming';

import { useEffect, useState } from 'react';
import API from './Services/AuthIntercepteurs';
import { UserContext } from './context/UserContext';
// import 'swiper/css'

function App() {

  const [userType, setUserType] = useState(10);
  

  useEffect(() => {
    API.get(`${process.env.REACT_APP_SERVER_END_POINT}/get/auth/user`).then((res) => {
      setUserType(res.data.type);
  });
  }, []);
  if(userType === 10){
    return null
  }
  return (
    <UserContext.Provider value={{userType, setUserType}}>
      
      <div className="App">
        <Router>
          <Switch>
            <PrivateRouteAdmin exact path="/dashboard" userType = {userType} component={Dashboard}></PrivateRouteAdmin>
            <PrivateRouteAdmin exact path="/dashboard/competitions" userType = {userType} component={Competition}></PrivateRouteAdmin>
            <PrivateRouteAdmin exact path="/dashboard/games" userType = {userType} component={Game}></PrivateRouteAdmin>
            <PrivateRouteAdmin exact path="/dashboard/tokens" userType = {userType} component={Token}></PrivateRouteAdmin>
            <PrivateRouteAdmin exact path="/dashboard/players" userType = {userType} component={Player}></PrivateRouteAdmin>
            <PrivateRouteAdmin exact path="/dashboard/offers" userType = {userType} component={Offer}></PrivateRouteAdmin>
            <PrivateRouteAdmin exact path="/dashboard/group" userType = {userType} component={Group}></PrivateRouteAdmin>
            <PrivateRouteAdmin exact path="/competition/:id" userType = {userType} component={CompetitionDetail}></PrivateRouteAdmin>
            <PrivateRouteAdmin exact path="/game/:id" userType = {userType} component={GameDetail}></PrivateRouteAdmin>
            <PrivateRouteAdmin exact path="/player/:id" userType = {userType} component={PlayerDetail}></PrivateRouteAdmin>
            <PrivateRouteAdmin exact path="/group/:id" userType = {userType} component={GroupDetail}></PrivateRouteAdmin>
          </Switch>


        



          <Switch>
         
            
            <Route exact path="/login">
              <Login />
            </Route>

            <Route exact path="/">
              <Upcoming />
            </Route>



          </Switch>

        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
