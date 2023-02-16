/**
 *   RealTyper
 *
 *   A JavaScript module that gives the effect of typing for texts
 *
 *   [Doc](https://github.com/cyrus2281/Real-Typer/tree/main/src/JavaScript#readme)
 *
 *   author: Cyrus Mobini
 *
 *   Licensed under the MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 *   Copyright 2023 Cyrus Mobini (https://github.com/cyrus2281)
 *
 *
 */


const sleep = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

const checkValues = (props) => {
  if (!props.strings) {
    if (props.developerMode) {
      console.warn('Pass your text to string input like: [strings]="yourText"');
    }
    return false;
  } else {
    if (!(props.loopStartIndex < props.strings?.length)) {
      if (props.developerMode) {
        console.error(
          "loop start value can not be bigger than length of the strings(" +
            props.strings?.length +
            ")"
        );
      }
      return false;
    }
  }
  if (!!props.callback) {
    if (!(props.callback instanceof Function)) {
      if (props.developerMode) {
        console.error("Only a function can be assigned to callback");
      }
      return false;
    }
  }
  return true;
};

const typeString = async (
  string,
  location,
  deleteString,
  setOutput,
  typeOptions,
) => {
  const { typeSpeed, deleteSpeed, holdDelay } = typeOptions;

  for (let i = 0; i < string.length; i++) {
    location[1] = i;
    await sleep(typeSpeed);
    setOutput(string.substring(0, i + 1));
  }

  if (deleteString) {
    await sleep(holdDelay);
    for (let i = string.length; i >= 0; i--) {
      location[1] = i;
      await sleep(deleteSpeed);
      setOutput(string.substring(0, i));
    }
  }
};

export const realType = async (
  typeOptions,
  setOutput,
) => {
  const {
    startDelay,
    strings,
    loop,
    loopStartIndex,
    loopHold,
    delete: deleteProp,
    deleteLastString,
    pauseDelay,
    callback,
    callbackArgs,
    developerMode,
  } = typeOptions;

  if (
    !checkValues({
      strings,
      developerMode,
      loopStartIndex,
      callback,
    })
  ) {
    return;
  }

  const stringArray = Array.isArray(strings) ? strings : [strings];
  const location = [0, 0];

  startDelay && (await sleep(startDelay));

  do {
    for (let i = location[0]; i < stringArray.length; i++) {
      location[0] = i;
      const deleteString =
        deleteProp && (deleteLastString || i !== stringArray.length - 1);

      await typeString(stringArray[i], location, deleteString, setOutput, {
        typeSpeed: typeOptions.typeSpeed,
        deleteSpeed: typeOptions.deleteSpeed,
        holdDelay: typeOptions.holdDelay,
      });
      pauseDelay && (await sleep(pauseDelay));
    }
    callback && callback(callbackArgs);
    loop && loopHold && (await sleep(loopHold));
    location[0] = loopStartIndex;
  } while (loop);
};

export const realTyperDefaultProps = {
  strings: "",
  cursorCharacter: "|",
  typeSpeed: 100,
  deleteSpeed: 50,
  holdDelay: 1500,
  pauseDelay: 1000,
  startDelay: 0,
  delete: true,
  deleteLastString: true,
  loop: true,
  loopHold: 1500,
  loopStartIndex: 0,
  callback: () => {},
  callbackArgs: undefined,
  developerMode: false,
};

export const cursorBlinkingAnimation = `@keyframes blink { 0% { opacity: 0; } 50% { opacity: 1; } 100% { opacity: 0; } }`
export const cursorBlinkingStyle = `animation: blink 0.75s infinite;`

export default realType;
