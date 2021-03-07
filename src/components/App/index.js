import React, { useEffect, useState } from "react";
import "./App.css";
import Button from "../Button/index";
import { FaBatteryFull, FaBatteryQuarter, FaWifi } from "react-icons/fa";

const App = () => {
  // title     
  document.title = "Iphone calculator ";
  

  const [value, setValue] = useState("0");
  const [memory, setMemory] = useState(null);
  const [operator, setOperator] = useState(null);

  const handleButtonPress = (content) => () => {
    const num = parseFloat(value);

    if (content === "AC") {
      setValue("0");
      setMemory(null);
      setOperator(null);
      return;
    }

    if (content === "±") {
      setValue((num * -1).toString());
      return;
    }

    if (content === "%") {
      setValue((num / 100).toString());
      setMemory(null);
      setOperator(null);
      return;
    }

    if (content === ".") {
      if (value.includes(".")) return;
      else setValue(value + ".");
      return;
    }

    if (content === "+") {
      if (!(operator === null)) {
        if (operator === "+") {
          setMemory(memory + parseFloat(value));
        } else if (operator === "-") {
          setMemory(memory - parseFloat(value));
        } else if (operator === "÷") {
          setMemory(memory / parseFloat(value));
        } else if (operator === "×") {
          setMemory(memory * parseFloat(value));
        }
      } else {
        setMemory(parseFloat(value));
      }
      setValue("0");
      setOperator("+");
      return;
    }
    if (content === "-") {
      if (!(operator === null)) {
        if (operator === "+") {
          setMemory(memory + parseFloat(value));
        } else if (operator === "-") {
          setMemory(memory - parseFloat(value));
        } else if (operator === "÷") {
          setMemory(memory / parseFloat(value));
        } else if (operator === "×") {
          setMemory(memory * parseFloat(value));
        }
      } else {
        setMemory(parseFloat(value));
      }
      setValue("0");
      setOperator("-");
      return;
    }
    if (content === "×") {
      if (!(operator === null)) {
        if (operator === "+") {
          setMemory(memory + parseFloat(value));
        } else if (operator === "-") {
          setMemory(memory - parseFloat(value));
        } else if (operator === "÷") {
          setMemory(memory / parseFloat(value));
        } else if (operator === "×") {
          setMemory(memory * parseFloat(value));
        }
      } else {
        setMemory(parseFloat(value));
      }
      setValue("0");
      setOperator("×");
      return;
    }
    if (content === "÷") {
      if (!(operator === null)) {
        if (operator === "+") {
          setMemory(memory + parseFloat(value));
        } else if (operator === "-") {
          setMemory(memory - parseFloat(value));
        } else if (operator === "÷") {
          setMemory(memory / parseFloat(value));
        } else if (operator === "×") {
          setMemory(memory * parseFloat(value));
        }
      } else {
        setMemory(parseFloat(value));
      }
      setValue("0");
      setOperator("÷");
      return;
    }

    if (content === "=") {
      if (!operator) return;
      if (operator === "+") {
        setValue((memory + parseFloat(value)).toString());
      }
      if (operator === "-") {
        setValue((memory - parseFloat(value)).toString());
      }
      if (operator === "÷") {
        setValue((memory / parseFloat(value)).toString());
      }
      if (operator === "×") {
        setValue((memory * parseFloat(value)).toString());
      }

      setOperator(null);
      setMemory(null);
      return;
    }

    if (value[value.length - 1] === ".") {
      setValue(value + content);
    } else {
      setValue(parseFloat(num + content).toString());
    }
  };
  // getTime
  const [myTime, setMyTime] = useState(0);
  const getHour = () => {
    var Day = new Date();
    var H = Day.getHours();
    var M = Day.getMinutes();
    setMyTime(H + ":" + time(M));
    function time(M) {
      if (M < 10) {
        M = "0" + M;
        return M;
      } else return M;
    }
  };
  setTimeout(getHour, 60000);

  // getbattery
  const [levelBattery, setLevelBattery] = useState(100);
  var level;
  const getBatteryDevice = () => {
    navigator.getBattery().then(function (battery) {
      setLevelBattery(parseInt(battery.level * 100) + "%");
      level = parseInt(battery.level * 100);
    });
  };
  // is device online
  const [isOnline, setIsOnline] = useState(false);
  const OnlineStatus = () => {
    if (navigator.onLine) {
      setIsOnline(true);
    } else setIsOnline(false);
  };

  useEffect(() => {
    getHour();
    getBatteryDevice();
    OnlineStatus();
  });

  return (
    <div className="App">
      <div className="top">
        {myTime}
        <div className="icon-container">
          {isOnline ? <FaWifi style={{ margin: "3px" }}></FaWifi> : ""}
          {levelBattery}
          <span className="icon">
            {level > 50 ? <FaBatteryFull /> : <FaBatteryQuarter />}
          </span>
        </div>
      </div>
      <div className="display">{value}</div>
      <div className="buttons">
        <Button
          onButtonClick={handleButtonPress}
          content="AC"
          type="function"
        />
        <Button onButtonClick={handleButtonPress} content="±" type="function" />
        <Button onButtonClick={handleButtonPress} content="%" type="function" />
        <Button onButtonClick={handleButtonPress} content="÷" type="operator" />
        <Button onButtonClick={handleButtonPress} content="7" />
        <Button onButtonClick={handleButtonPress} content="8" />
        <Button onButtonClick={handleButtonPress} content="9" />
        <Button onButtonClick={handleButtonPress} content="×" type="operator" />
        <Button onButtonClick={handleButtonPress} content="4" />
        <Button onButtonClick={handleButtonPress} content="5" />
        <Button onButtonClick={handleButtonPress} content="6" />
        <Button onButtonClick={handleButtonPress} content="-" type="operator" />
        <Button onButtonClick={handleButtonPress} content="1" />
        <Button onButtonClick={handleButtonPress} content="2" />
        <Button onButtonClick={handleButtonPress} content="3" />
        <Button onButtonClick={handleButtonPress} content="+" type="operator" />
        <Button onButtonClick={handleButtonPress} content="0" />
        <Button onButtonClick={handleButtonPress} content="." />
        <Button onButtonClick={handleButtonPress} content="=" type="operator" />
      </div>
      <div className="bottom"></div>
    </div>
  );
};

export default App;
