import React, { useState } from 'react';
import { Card, Embed, Button, Accordion } from 'semantic-ui-react';


const Workout = ({ exercise, toggleFavs, favworkouts , replaceWorkout, refresh, user, saved}) =>{
  const [videoHidden, setVideoHidden] = useState(false)
  
  console.log(exercise.Title);
  return (
    <Card color="blue">
      <Card.Content>
        {user ? 
          <Button
            floated="right"
            icon={favworkouts.includes(exercise) ? "heart" : "heart outline"}
            basic={favworkouts.includes(exercise) ? false : true}
            color="blue"
            onClick={() => toggleFavs(exercise)}
          />
        : null}
        {!saved ? 
          <Button
            floated="right"
            color="blue"
            basic
            icon="exchange"
            content="Swap"
            onClick={() => {
              replaceWorkout(exercise);
              refresh();
            }}
          />
          : null
        }
        <Card.Header>{exercise.Title}</Card.Header>
        <Card.Meta>Duration: {exercise.Duration} seconds</Card.Meta>
        <Card.Meta>Equipment: {exercise.Equipment}</Card.Meta>
        <Card.Description>
          <Accordion>
            <Accordion.Title active={videoHidden}>
              <Button
                icon={videoHidden ? "close" : "video"}
                basic={videoHidden ? true : false}
                color="blue"
                content={videoHidden ? "Close Tutorial" : "Watch Tutorial"}
                onClick={() => setVideoHidden(!videoHidden)}
              />
            </Accordion.Title>
            <Accordion.Content active={videoHidden}>
              <Embed
                active
                id={exercise.Tutorial}
                source="youtube"
                style={{ maxWidth: "400px", maxHeight: "300px" }}
              />
            </Accordion.Content>
          </Accordion>
        </Card.Description>
      </Card.Content>
    </Card>
  );};

export default Workout