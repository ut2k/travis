import React, { useContext } from 'react';
import { Grid, Card, Header, Icon, Button, Segment, Divider } from 'semantic-ui-react';
import SavedList from '../Components/SavedList';
import { WorkoutContext } from '../context';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { firebase } from '../firebaseDb';
import 'firebase/database';
import "firebase/auth";

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

const SignIn = () => (
  <StyledFirebaseAuth
    uiConfig={uiConfig}
    firebaseAuth={firebase.auth()}
  />
);

const SignInScreen = () => (
  <Grid centered style={{ marginTop: "30px" }}>
    <Segment color="blue" style={{ width: "80%" }}>
      <Grid.Row>
        <Header content="Log in to access saved workouts and more!" />
      </Grid.Row>
      <Grid.Row>
        <SignIn />
      </Grid.Row>
    </Segment>
  </Grid>
)

const ProfileScreen = ({user}) => {
  const workoutContext = useContext(WorkoutContext)
  const { favworkouts } = workoutContext;
  return (
    <Grid centered style={{ marginTop: "30px" }}>
      <Grid.Row>
        <Header inverted>
          <Icon name='user' />
          {user.displayName}
        </Header>
      </Grid.Row>
      <Grid.Row>
        <Button 
          primary 
          content="Logout" 
          onClick={() => firebase.auth().signOut()} 
        />
      </Grid.Row>
      <Divider inverted />
      <Grid.Row>
        <Header inverted dividing content="FAVORITE WORKOUTS" />
        { favworkouts.length === 0 ? <NoFavesMessage />
        : <SavedList user={user} /> }
      </Grid.Row>
    </Grid>
  )
}


const ProfilePage = ({ user }) => {
  return (
    user ? <ProfileScreen user={user} /> : <SignInScreen />
  );
};

const NoFavesMessage = () =>
  <Card style={{ textAlign: "left", width: "80%", marginTop:"0" }}>
    <Card.Content>
      <Card.Header content="Your favorites list is empty!" />
      <Card.Description>
        Save workouts to this list by tapping on the heart icon next to the workout name!
      </Card.Description>
    </Card.Content>
  </Card>

export default ProfilePage