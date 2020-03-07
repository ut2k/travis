import React, { useContext, useState } from 'react';
import { Grid, Header, Button, Segment } from 'semantic-ui-react';
import WorkoutList from '../Components/WorkoutList';
import ActiveWorkoutTimer from '../Components/ActiveWorkoutTimer';
import { Link } from 'react-router-dom';
import { WorkoutContext } from '../context';

const WorkoutsPage = ({user}) => {
  const workoutContext = useContext(WorkoutContext);
  const { equipment, exercisesAmount, generateDisplayList } = workoutContext;

  const [ workingOut, setWorkingOut ] = useState(false);
 
  const selectedEquipment =
    (equipment.length === 1 & equipment[0] === "None") ? 
    "Bodyweight" : 
    equipment.join(", ").replace("None,", "Bodyweight,")

 
  return (
    !workingOut ? 
    <Grid key={'content'} centered style={{ marginTop: "15px" }} >
      <Grid.Row>
        <WorkoutListHeader 
          selectedEquipment={selectedEquipment} 
          exercisesAmount={exercisesAmount} 
          setWorkingOut={() => {
            generateDisplayList();
            setWorkingOut(true)}}
        />
      </Grid.Row>
      <Grid.Row>
        <WorkoutList user={user} />
      </Grid.Row>
    </Grid>
    :
    <ActiveWorkoutTimer cancel={() => setWorkingOut(!workingOut)} />
  );
}

const WorkoutListHeader = ({ selectedEquipment, exercisesAmount, setWorkingOut }) => {
  return (
    <Segment color="blue" style={{ width: "80%", textAlign: "left", marginTop: "20px"}}>
      <Header dividing as="h3">
        <Header textAlign="center" dividing color="blue">
          Preview Workout
          <Header.Subheader content="Watch tutorials, save workouts for later, and/or swap out workouts you don't like." />
        </Header>
        <Header.Subheader content="Selected Round Count:" />
        {`${exercisesAmount} Total Exercises`}
        <Header.Subheader content="Selected Workout Equipment:" />
        {selectedEquipment}
      </Header>
      <Grid>
        <Grid.Column textAlign="center">
          <Button.Group size="small">
            <Button
              attached="left"
              as={Link}
              primary
              to="/"
              icon="arrow left"
              content="Back to Selection"
            />
            <Button
              attached="right"
              color="green"
              icon="play"
              content="Begin Workout"
              onClick={setWorkingOut}
            />
          </Button.Group>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

export default WorkoutsPage