import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import SplashPage from './Pages/SplashPage';
import WorkoutsPage from './Pages/WorkoutsPage';
import TopMenu from './Components/TopMenu';

import { firebase }from './firebaseDb';
import 'firebase/database';
import "firebase/auth";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);
  



  const withMenu = (page) => {
    return (
      <Container>
        <TopMenu user={user} />
        {page}
      </Container>
    )
  };

  return (
    <BrowserRouter>
      <Route 
        exact 
        path='/' 
        render={() => withMenu(<SplashPage />)}
      />
      <Route
        path='/workouts'
        render={() => withMenu(<WorkoutsPage user={user} />)}
      />
      <Route
        path='/profile'
        render={() => withMenu(<ProfilePage user={user} />)}
      />
    </BrowserRouter>
  );
};

export default App;
