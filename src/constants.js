export const EQUIPMENT_LIST = [
  {
    id: "1",
    title: "Jump Rope",
    description: "a rope!",
    url: "./assets/rope.jpg"
  },
  {
    id: "2",
    title: "Power Ball",
    description: "a ball!",
    url: "./assets/ball.jpg"
  },
  {
    id: "3",
    title: "Dumbbells",
    description: "a dumbbell!",
    url: "./assets/dumbbell.jpg"
  },
  {
    id: "4",
    title: "Barbell / Plates",
    description: "a plate!",
    url: "./assets/barbell.jpg"
  },
  {
    id: "5",
    title: "Pull-Up Bar",
    description: "a pull bar!",
    url: "./assets/pull.jpg"
  },
  {
    id: "6",
    title: "Kettlebell",
    description: "a kettle!",
    url: "./assets/bell.jpg"
  },
  {
    id: "7",
    title: "Jumping Box",
    description: "a box!",
    url: "./assets/box.jpeg"
  },
  {
    id: "8",
    title: "Rings",
    description: "a ring!",
    url: "./assets/ring.webp"
  },
  {
    id: "9",
    title: "Resistance Band",
    description: "a band!",
    url: "./assets/band.jpeg"
  },
  {
    id: "10",
    title: "Sandbag",
    description: "a bag!",
    url: "./assets/bag.png"
  },
  {
    id: "11",
    title: "None",
    description: "a body!",
    url: "./assets/body.png"
  }
];

export const MUSCLE_LIST= [
  {
    id: "1",
    title: "Back"
  },
  {
    id: "2",
    title: "Legs"
  },
  {
    id: "3",
    title: "Shoulder"
  },
  {
    id: "4",
    title: "Arms"
  },
  {
    id: "5",
    title: "Full-Body"
  },
  {
    id: "6",
    title: "Abs"
  },  
];

const generateMinutes = () => {
  let minutes = [];
  for (let i = 0; i < 11; i++) {
    minutes.push({ value: i*60000, text: i, key: i })
  };
  return minutes;
}

const generateSeconds = () => {
  let seconds = [];
  for (let i = 0; i < 60; i=i+5) {
    seconds.push({ value: i*1000, text: i, key: i })
  };
  return seconds;
}

export const MINUTES = generateMinutes();
export const SECONDS = generateSeconds();