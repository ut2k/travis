import React, { createContext, useState } from 'react';
import * as data from './wkouts.json';
import { shuffleList } from './utilities';

const { Exercises } = data;

// const grabExercises = async () => {
//   const dataPayload = await firebaseDb.once('value');

//   console.log(dataPayload.val());

//   return dataPayload.exists() ? dataPayload.val() : {};
// };
//grabExercises();

const exercises = Object.values(Exercises);
const WorkoutContext = createContext(null);
const { Provider } = WorkoutContext;

const initialWorkouts = shuffleList(exercises.filter(val => {
  return val.Equipment === "None"
})).slice(0, 8)

const StateProvider = ({ children }) => {
  const [possible, setPossible] = useState(false);
  const [equipment, setEquipment] = useState(["None"]);
  const [muscleGroups, setMuscleGroups] = useState(["None"]);
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [replace, setReplace] = useState([]);
  const [favworkouts, setFavworkouts] = useState([]);
  const [exercisesAmount, setExercisesAmount] = useState(8);
  const [countdown, setCountdown] = useState(0);
  const [currentWorkoutID, setCurrentWorkoutID] = useState(0);
  const [displayList, setDisplayList] = useState([]);

  
  const update = () => {
    
    if (equipment.length > 0 && muscleGroups.length > 1) {
      setPossible(true);
    }
    else {
      setPossible(false);
    }
    return possible;
  }

  const addEquip = value => {
    equipment.includes(value) ? setEquipment(equipment.filter(x => x !== value)) : setEquipment([...equipment, value]);
  }

  const addMuscleGroup = value => {
    muscleGroups.includes(value)? setMuscleGroups(muscleGroups.filter(x => x !== value)):setMuscleGroups([...muscleGroups, value]);
  }

  const toggleFavs = value => {
    favworkouts.map(val => val.Title).includes(value.Title) ?
      setFavworkouts(favworkouts.filter(x => x.Title !== value.Title)) :
      setFavworkouts([...favworkouts, value])
  }

  const generateWorkouts = () => {
    const values = exercises.filter(val => {
      // console.log("generateWorkouts called")
      // console.log(val)
      return equipment.includes(val.Equipment) && muscleGroups.includes(val["Primary Muscle Group"]);
    })

    // values = values.filter(val => {
    //   return muscleGroups.includes(val["Primary Muscle Group"])
    // })

    setCurrentWorkoutID(0);
    let substr = shuffleList(values);
    console.log(substr);
    setWorkouts(substr.slice(0, exercisesAmount));
    console.log(substr.slice(0, exercisesAmount))
    setReplace(substr.slice(exercisesAmount, substr.length));
    console.log(substr.slice(exercisesAmount, substr.length))
  }

  const generateDisplayList = () => {
    let display = []
    const restItem = exercises.filter(val => val.Title === "Rest")[0]
    console.log(restItem);
    
    for (const workout of workouts) {
      display.push(workout)
      display.push(restItem)
    }
    setDisplayList(display)
  }

  const replaceWorkout = clickElement => {
    if (replace.length > 0){
      let val = replace;
    let element = val.pop();
    let val1 = workouts;
    let index = val1.indexOf(clickElement);
    val1[index] = element;
    setReplace(val);
    setWorkouts(val1);
    }
  }

  const api = {
    equipment,
    update,
    
    addEquip,
    muscleGroups,
    addMuscleGroup,
    workouts,
    generateWorkouts,
    exercisesAmount,
    setExercisesAmount,
    countdown,
    setCountdown,
    favworkouts,
    toggleFavs,
    replaceWorkout,
    currentWorkoutID,
    setCurrentWorkoutID,
    displayList,
    generateDisplayList
  };

  return <Provider value={api}>{children}</Provider>;
}

export { WorkoutContext, StateProvider };