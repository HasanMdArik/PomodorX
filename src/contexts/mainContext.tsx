import React, {
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
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
  //? Also loading stored value from localStorage if found, else going with default value({ loopCount:0, pastLoopCount: 0 })
  const [loopData, setLoopData] = useState<loopData>(() => {
    // First check if window is defined or not, else build will fail
    if (typeof window === "undefined") {
      return {
        loopCount: 0,
        pastLoopCount: 0,
      };
    }
    try {
      let storedLoopData = localStorage.getItem("loopData");
      if (storedLoopData) {
        return JSON.parse(storedLoopData);
      } else {
        return {
          loopCount: 0,
          pastLoopCount: 0,
        };
      }
    } catch (_) {
      return {
        loopCount: 0,
        pastLoopCount: 0,
      };
    }
  });
  //? The running step indicates the index of currently running step
  //? Also loading stored value from localStorage if found, else going with default value(-1)
  const [runningStep, setRunningStep] = useState(() => {
    // First check if window is defined or not, else build will fail
    if (typeof window === "undefined") {
      return -1;
    }
    try {
      let storedRunningStep = localStorage.getItem("runningStep");
      let storedTimeSteps = localStorage.getItem("timeSteps");
      if (storedRunningStep && storedTimeSteps) {
        let parsedRunningStep: number = parseInt(storedRunningStep);
        let parsedTimeSteps: Array<timeStepData> = JSON.parse(storedTimeSteps);

        if (
          parsedRunningStep >= 0 &&
          parsedTimeSteps.length > parsedRunningStep
        ) {
          return parsedRunningStep;
        } else {
          return -1;
        }
      } else {
        return -1;
      }
    } catch (_) {
      return -1;
    }
  });

  //? The timeSteps state will be used by timeStepMenu.tsx and countdown.tsx
  //? Also loading stored value from localStorage if found, else going with default value([])
  const [timeSteps, setTimeSteps] = useState<Array<timeStepData>>(() => {
    // First check if window is defined or not, else build will fail
    if (typeof window === "undefined") {
      return -1;
    }
    try {
      let storedTimeSteps = localStorage.getItem("timeSteps");
      if (storedTimeSteps) {
        return JSON.parse(storedTimeSteps);
      } else {
        return [];
      }
    } catch (_) {
      return [];
    }
  });

  //? The variable to let other components know about stored to be updated
  //* This variable is updater to trigger useEffect functions
  const [isInitialTimeStepsUpdated, setIsInitialTimeStepsUpdated] =
    useState(false);

  //? The audio context
  const [audioContext, setAudioContext] = useState(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      return new AudioContext();
    } catch (_) {
      return;
    }
  });

  //? The audio file
  const [audioSource, setAudioSource] = useState(() => {
    if (typeof window === "undefined" || !audioContext) {
      return;
    }
    try {
      return audioContext.createBufferSource();
    } catch (_) {
      return;
    }
  });

  //? The useEffect function to update data with localStorage
  useEffect(() => {
    localStorage.setItem("loopData", JSON.stringify(loopData));
    localStorage.setItem("runningStep", runningStep.toString());
    localStorage.setItem("timeSteps", JSON.stringify(timeSteps));
  }, [loopData, runningStep, timeSteps]);

  //? The useEffect funtion to create timeSteps from loopCount or from localStorage
  useEffect(() => {
    if (timeSteps.length < loopData.loopCount * 2) {
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
    }
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

  //* Event listeners
  //? The event listener to initialize audioContext
  useLayoutEffect(() => {
    const bodyElement = document.body;
    let intializedAudio = false;
    //? The function to decide whether to trigger initialization function or to remove the event listener
    const eventFunction = () => {
      if (intializedAudio) {
        bodyElement.removeEventListener("click", eventFunction);
      } else {
        initializeAudioContext();
        intializedAudio = true;
      }
    };
    bodyElement.addEventListener("click", eventFunction);
  }, []);

  //* Private functions
  //? The function to initialize audio context
  const initializeAudioContext = async () => {
    if (audioContext && audioSource) {
      let audioBuf: AudioBuffer;

      let storedAudioData = localStorage.getItem("audioData");
      if (storedAudioData !== null) {
        let audioArr = JSON.parse(storedAudioData);
        let audioIntArr = new Int8Array(audioArr);

        // Configure the audioContext and audioSource
        audioBuf = await audioContext.decodeAudioData(
          audioIntArr.buffer,
          (decodedData) => decodedData
        );
      } else {
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
        audioBuf = await audioContext.decodeAudioData(
          buffer,
          (decodedData) => decodedData
        );
      }

      // Configure audioSource
      audioSource.buffer = audioBuf; // tell the source which sound to play
      audioSource.connect(audioContext.destination); // connect the source to the context's destination (the speakers)
      audioSource.loop = true; // tell the source to loop the audio
      audioSource.start();

      // if the audio context is not suspended, suspend it to prevent unwanted playing of the audio
      if (audioContext.state === "running") await audioContext.suspend();

      // Set the states
      setAudioContext(audioContext);
      setAudioSource(audioSource);
    }
  };

  //? Pretty self-explainatory
  const stopAlarm = async () => {
    // Stop the alarm
    if (audioContext) {
      console.log("Stop:", audioContext.state);
      if (audioContext.state === "running") {
        await audioContext.suspend();
      }
    }
  };

  //* The other functions
  //? The function to start the alarm
  const startAlarm = async () => {
    // Start the alarm
    if (audioContext) {
      console.log("Start:", audioContext.state);
      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }
    }
  };

  //? The function to cancel the timer
  const cancelTimer = async () => {
    // Turn all states to default(except the state as that is handled by a useEffect func)
    setLoopData({
      loopCount: 0,
      pastLoopCount: 0,
    });
    stopAlarm();
    setRunningStep(-1);
    setTimeSteps([]);
    if (audioContext && audioContext.state === "running") {
      await audioContext.suspend();
    }
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
      stopAlarm();
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
    // initialDataUpdateTrigger,
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
