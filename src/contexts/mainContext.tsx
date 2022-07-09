import React, { ReactNode, useContext, useEffect, useState } from "react";
import { timePeriods } from "../data/data";
import {
  mainContextInterface,
  loopData,
  timeStepData,
  timeStepTypes,
} from "../data/dataTypes";
import birdsChirpingAudio from "../assets/birdsChirping.mp3";
const MainContext = React.createContext({} as mainContextInterface);

export const useMainContext = () => {
  return useContext(MainContext);
};

const MainContextProvider = ({ children }: { children: ReactNode }) => {
  //? The state variable defines the state of the app
  // 0 stands for timer not started
  // 1 stands for work time
  // 2 stands for short break
  // 3 stands for long break
  const [state, setState] = useState(0);
  //? The loopData will be used to get loop-count from loopInput.tsx
  const [loopData, setLoopData] = useState<loopData>({
    loopCount: 0,
    pastLoopCount: 0,
  });
  //? The running step indicates the index of currently running step
  const [runningStep, setRunningStep] = useState(-1);

  //? The timeSteps state will be used by timeStepMenu.tsx and countdown.tsx
  const [timeSteps, setTimeSteps] = useState<Array<timeStepData>>([]);

  //? The audio context
  const [audioContext, setAudioContext] = useState<AudioContext>();

  //? The audio file
  const [audioSource, setAudioSource] = useState<AudioBufferSourceNode>();

  //* The UseEffect Functions to look for updates
  //? The initial useEffect function to load data and to store data
  useEffect(() => {}, []);

  //? The updater useEffect to update data with localStorage
  useEffect(() => {}, [loopData]);

  //? The useEffect funtion to create timeSteps from loopCount and load audio
  useEffect(() => {
    //* The Audio Loading Part
    if (
      loopData.loopCount > 0 &&
      audioSource === undefined &&
      audioContext === undefined
    ) {
      const audioCtx = new AudioContext();
      let audioSrc = audioCtx.createBufferSource();
      let audioBuf: AudioBuffer;

      let storedAudioData = localStorage.getItem("audioData");
      if (storedAudioData !== null) {
        let audioArr = JSON.parse(storedAudioData);
        let audioIntArr = new Int8Array(audioArr);

        // Configure the audioContext and audioSource
        audioCtx
          .decodeAudioData(audioIntArr.buffer, function (decodedData) {
            audioBuf = decodedData;
          })
          .then(() => {
            audioSrc.buffer = audioBuf; // tell the source which sound to play
            audioSrc.connect(audioCtx.destination); // connect the source to the context's destination (the speakers)
            audioSrc.loop = true; // tell the source to loop the audio
            setAudioContext(audioCtx);
            setAudioSource(audioSrc);
          });
      } else if (audioSource === undefined && audioContext === undefined) {
        const getAudioData = async () => {
          let res = await fetch(birdsChirpingAudio, {
            mode: "no-cors",
            cache: "force-cache",
          });
          let buffer = await res.arrayBuffer();

          // Store the audio file
          const audioData = new Int8Array(buffer);
          const storableAudioData = Array.from(audioData);
          localStorage.setItem("audioData", JSON.stringify(storableAudioData));

          // Configure audioContext with the audio data
          await audioCtx.decodeAudioData(buffer, function (decodedData) {
            audioBuf = decodedData;
          });

          audioSrc.buffer = audioBuf; // tell the source which sound to play
          audioSrc.connect(audioCtx.destination); // connect the source to the context's destination (the speakers)
          audioSrc.loop = true; // tell the source to loop the audio
          setAudioContext(audioCtx);
          setAudioSource(audioSrc);
        };

        getAudioData();
      }
    }

    //* The time steps updating part
    const newTimeSteps: Array<timeStepData> = [];
    let stepsCount = loopData.loopCount * 2; // each loop contains one work step and another break step
    for (let i = 1; i <= stepsCount; i++) {
      let type: timeStepTypes =
        i % 2 != 0
          ? timeStepTypes.work
          : i % 8 != 0
          ? timeStepTypes.short
          : timeStepTypes.long;
      let stepTime = timePeriods[type];
      newTimeSteps.push({
        startingTime: -1,
        stepTime,
        type,
      });
    }
    setTimeSteps(newTimeSteps);
  }, [loopData]);

  //? The useEffect function to update state with new runningSteps
  //? It also fires the alarm function
  useEffect(() => {
    if (runningStep == -1) {
      setState(0);
    } else {
      // 1. calculate the new state
      //! Need to add one with the runningStep for calculations, because it is an index
      const newState =
        (runningStep + 1) % 2 != 0 ? 1 : (runningStep + 1) % 8 != 0 ? 2 : 3;
      // 2. Update the states
      setState(newState);
    }
  }, [runningStep]);

  //* Private functions
  const stopAlarm = () => {
    if (audioSource) {
      try {
        audioSource.stop(0);
      } catch (_) {}
    }
  };

  //* The other functions
  //? The function to start the alarm
  const startAlarm = async () => {
    // Start the alarm
    if (audioContext && audioSource) {
      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }
      audioSource.start(0);
    }
  };

  //? The function to cancel the timer
  const cancelTimer = () => {
    // Turn all states to default(except the state as that is handled by a useEffect func)
    setLoopData({
      loopCount: 0,
      pastLoopCount: 0,
    });
    stopAlarm();
    setRunningStep(-1);
    setTimeSteps([]);
  };

  //? The function to start the next step from the steps
  //? it also updates the steps with required data
  const startNextStep = () => {
    // 1. Check if all time steps are finished
    if (runningStep + 1 == timeSteps.length) {
      // if finished return to default screen
      setState(0);
      setTimeSteps([]);
      setRunningStep(-1);
      return;
    }
    // If time steps left to be done,
    // 2. update runningStep
    let newRunningStep = runningStep + 1;

    // 3. update the new step with data
    let newTimeSteps = [...timeSteps];
    newTimeSteps[newRunningStep].startingTime = Math.floor(Date.now() / 1000);

    // 4. Stop the alarm if not the initial start
    if (runningStep >= 0) {
      stopAlarm();
    }

    // 5. Update the states
    setRunningStep(newRunningStep);
    setTimeSteps(newTimeSteps);
  };

  const contextValues: mainContextInterface = {
    loopData,
    runningStep,
    state,
    timeSteps,
    setLoopData,
    startAlarm,
    cancelTimer,
    startNextStep,
  };
  return (
    <MainContext.Provider value={contextValues}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
