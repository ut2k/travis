import React, { useContext, useState } from "react";
import { Header, Button, Grid, Confirm } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { WorkoutContext } from "../context";
import Timer from "react-compound-timer";

const ActiveWorkoutTimer = ({ cancel }) => {
  const workoutContext = useContext(WorkoutContext);
  const {displayList: workouts, currentWorkoutID } = workoutContext;

  const withTimer = timerProps => WrappedComponent => wrappedComponentProps => (
    <Timer {...timerProps}>
      {timerRenderProps => 
        <WrappedComponent 
          {...wrappedComponentProps} 
          timer={timerRenderProps} 
          workout={workoutContext}
          cancel={cancel} 
        />
      }
    </Timer>
  )

  const TimerHOC = withTimer({
    formatValue: x => `${x < 10 ? `0${x}` : x}`,
    direction: "backward",
    timeToUpdate: 100,
    startImmediately: true,
    initialTime: workouts[currentWorkoutID].Duration * 1000
  })(WorkoutQueue);

  return (
    <TimerHOC />
  );
};

const StartButton = ({ start, pause, resume, getTimerState, getTime }) => {
  const status = getTimerState();
  const time = getTime();
  console.log(status);
  return (
    <Button
      icon={
        (status === "STOPPED") | (status === "INITED")
          ? "play"
          : status === "PAUSED"
          ? "play"
          : "pause"
      }
      size="massive"
      circular
      disabled={time === 0}
      positive
      onClick={
        (status === "STOPPED") | (status === "INITED")
          ? start
          : status === "PAUSED"
          ? resume
          : pause
      }
    >
    </Button>
  );
};

const ResetButton = ({ getTimerState, reset, getTime }) => {
  const status = getTimerState();
  const time = getTime();
  return (
    <Button
      icon="redo"
      circular
      size="big"
      disabled={(status === "STOPPED") | (time === 0)}
      onClick={reset}
    />
  );
};

const NextButton = ({ next }) => {
  const [popup, setPopup] = useState(false);
  return( 
  <div>
  <Button icon="forward" circular size="big" onClick={() => setPopup(true)} />
  <Confirm 
  open={popup} 
  content={"Are you sure you want to skip this exercise?"}
  confirmButton={"Yes"}
  cancelButton={"No"}
  onConfirm={next}
  onCancel = {()=> setPopup(false)}
  />
  </div>
  )};

class WorkoutQueue extends React.Component {
  state={
    endWorkout: false
  };

  componentDidMount(){
    const { setCurrentWorkoutID, displayList: workouts, currentWorkoutID } = this.props.workout;
    const { setCheckpoints, setTime  } = this.props.timer;

    const next = () => {
      if (currentWorkoutID < workouts.length - 1) {
        setTime(workouts[currentWorkoutID + 1].Duration);
        setCurrentWorkoutID(currentWorkoutID + 1);
      }
      else {
        this.setState({ endWorkout: true })
      }
    };

    setCheckpoints([
      {
        time: 0,
        callback: () => next()
      }
    ]);
  };

  render() {
    const { cancel } = this.props;
    const { endWorkout } = this.state;
    const { displayList: workouts, currentWorkoutID, setCurrentWorkoutID } = this.props.workout;
    const { getTime, getTimerState, start, resume, pause, reset, setTime  } = this.props.timer;
    
    const next = () => {
      if (currentWorkoutID < workouts.length - 1) {
        setTime(workouts[currentWorkoutID + 1].Duration);
        setCurrentWorkoutID(currentWorkoutID + 1);
      }
      else {
        this.setState({ endWorkout: true })
      }
      this.setState({popup: true})
    };

    return (
      <Grid style={{marginTop: "50px" }} centered columns={3}>
        {!endWorkout ? 
        <React.Fragment>
          <Grid.Row>
            <Header inverted size="large" >
              {workouts[currentWorkoutID].Title}
            </Header>
          </Grid.Row>
          <Grid.Row>
            <Header inverted style={{ fontSize: "80px" }}>
              <Timer.Minutes />:<Timer.Seconds />
            </Header>
          </Grid.Row>
          <Grid.Row>
          <Header color="grey">
          {`NEXT UP: ${workouts[currentWorkoutID+1] ? workouts[currentWorkoutID+1].Title : 'DONE'}`}
          </Header>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column verticalAlign="middle" textAlign="right">
              <ResetButton
                reset={reset}
                getTimerState={getTimerState}
                getTime={getTime}
              />
            </Grid.Column>
            <Grid.Column verticalAlign="middle">
              <StartButton
                getTimerState={getTimerState}
                getTime={getTime}
                start={start}
                pause={pause}
                resume={resume}
              />
            </Grid.Column>
            <Grid.Column verticalAlign="middle" textAlign="left">
              <NextButton next={next}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Button content="Back to Workout Preview" onClick={cancel} />
          </Grid.Row>
        </React.Fragment>
        :
        <React.Fragment>
          <Grid.Row>
            <Header size="large" inverted content="END OF WORKOUT" />
          </Grid.Row>
          <Grid.Row>
            <Button content="Back To Workout Generator" as={Link} to="/" />
          </Grid.Row>
        </React.Fragment>}
      </Grid>
    );
  }
}

export default ActiveWorkoutTimer;