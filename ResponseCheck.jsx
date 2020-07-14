import React, { useState, useRef } from 'react';

const ResponseCheck = () => {
  const [state, setstate] = useState("waiting"),
  [message, setmessage] = useState("click"),
  [result, setresult] = useState([]),
  timeout = useRef(null),
  startTime = useRef(0),
  endTime = useRef(0);

  const onClickScreen = () => {
    if(state === "waiting")  {
      timeout.current = setTimeout(() => {
        setstate("now");
        setmessage("now click");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
      setstate("ready");
      setmessage("wait for green")
    } else if (state === "ready") {
      clearTimeout(timeout.current);
      setstate("waiting");
      setmessage("wait for green");
    } else if (state == "now"){
      endTime.current = new Date();
      setstate("waiting");
      setmessage("click to start");
      setresult((preresult) => {
        return[...preresult, endTime.current - startTime.current]
      });
    }
  };
  const onReset = () => {
    setResult([]);
  };

  const renderAverage = () => {
    return result.length === 0
      ? null
      : <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={onReset}>리셋</button>
      </>
  };
  return (
    <>
      <div
        id="screen"
        className={state}
        onClick={onClickScreen}
      >
        {message}
      </div>
      {renderAverage()}
    </>
  );
};

export default ResponseCheck;
