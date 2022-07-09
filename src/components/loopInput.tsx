import React, { useEffect, useState } from "react";
import { useMainContext } from "../contexts/mainContext";

const LoopInput = () => {
  const { setLoopData, startNextStep, loopData } = useMainContext();
  const [pastLoopCount, setPastLoopCount] = useState(0);
  const [loopCount, setLoopCount] = useState(
    loopData.loopCount >= 0 ? loopData.loopCount : 0
  );

  //* Updating the steps data if the loop count changes
  useEffect(() => {
    if (loopData.loopCount != loopCount) {
      setLoopData({
        pastLoopCount: pastLoopCount,
        loopCount: loopCount,
      });
    }
    setPastLoopCount(loopCount);
  }, [loopCount]);

  return (
    <div>
      <div className="flex items-center">
        <label className="text-3xl mr-2 mb-0" htmlFor="loopCount">
          Loop Count:
        </label>
        <div className="relative flex items-center">
          <input
            value={loopCount}
            min={0}
            max={12}
            onChange={(e) => {
              setLoopCount(
                parseInt(e.target.value)
                  ? parseInt(e.target.value) > 12
                    ? 12
                    : parseInt(e.target.value)
                  : 0
              );
            }}
            placeholder="Number of times you want to do the loop"
            type="number"
            id="loopCount"
            className="main-border"
          />
          <div className="loopButtons absolute right-3">
            <button
              onClick={() => {
                setLoopCount(loopCount + 1);
              }}
              className="loopButton"
              id="up"
            >
              <div className="arr" />
            </button>
            <button
              disabled={loopCount <= 0}
              onClick={() => {
                setLoopCount(loopCount - 1);
              }}
              className="loopButton"
              id="down"
            >
              <div className="arr" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-3">
        <button
          className="primary-bg main-border rounded-[1.25rem] text-3xl py-1.5 px-10"
          id="startButton"
          disabled={loopCount <= 0}
          onClick={() => {
            startNextStep();
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default LoopInput;
