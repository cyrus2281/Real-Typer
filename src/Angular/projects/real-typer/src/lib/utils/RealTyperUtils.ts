/**
 *   RealTyper for Angular
 *
 *   An Angular component that gives the effect of typing for texts
 *
 *   [Doc](https://github.com/cyrus2281/Real-Typer/tree/main/src/Angular/projects/real-typer#readme)
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

export interface StringTypeOptions {
  /** The character that will be used as a cursor, "" for no cursor */
  cursorCharacter: string;
  /** The speed of typing in milliseconds */
  typeSpeed: number;
  /** The speed of deleting in milliseconds */
  deleteSpeed: number;
  /** The delay between typing and deleting in milliseconds */
  holdDelay: number;
}

export interface RealTypeOptions {
  /** The delay before typing starts in milliseconds */
  startDelay: number;
  /** The text that will be typed, can be an array of strings */
  strings: string | string[];
  /** If true, the typing will loop */
  loop: boolean;
  /** The index of the string that the loop will start from */
  loopStartIndex: number;
  /** The delay between loops in milliseconds */
  loopHold: number;
  /** If true, the strings will be delete after typing */
  delete: boolean;
  /** If true, the last string will be deleted */
  deleteLastString: boolean;
  /** The delay between each string element in milliseconds */
  pauseDelay: number;
  /** A function that will be called after each cycle */
  callback: (args: unknown) => void;
  /** The arguments that will be passed to the callback function */
  callbackArgs: unknown;
  /** If true, there would be log errors if there is an issue with the prop validation*/
  developerMode: boolean;
}

const sleep = (duration: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, duration));

const checkValues = (props: {
  strings: string | string[];
  developerMode: boolean;
  loopStartIndex: number;
  callback: (args: unknown) => void;
}) => {
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
  string: string,
  location: [number, number],
  deleteString: boolean,
  setOutput: (output: string) => void,
  typeOptions: StringTypeOptions
) => {
  const { typeSpeed, deleteSpeed, holdDelay, cursorCharacter } = typeOptions;

  for (let i = 0; i < string.length; i++) {
    location[1] = i;
    await sleep(typeSpeed);
    setOutput(string.substring(0, i + 1) + cursorCharacter);
  }

  if (deleteString) {
    await sleep(holdDelay);
    for (let i = string.length; i >= 0; i--) {
      location[1] = i;
      await sleep(deleteSpeed);
      setOutput(string.substring(0, i) + cursorCharacter);
    }
  }
};

export const realType = async (
  typeOptions: RealTypeOptions & StringTypeOptions,
  setOutput: (string: string) => void
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
  const location: [number, number] = [0, 0];

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
        cursorCharacter: typeOptions.cursorCharacter,
      });
      pauseDelay && (await sleep(pauseDelay));
    }
    callback && callback(callbackArgs);
    loop && loopHold && (await sleep(loopHold));
    location[0] = loopStartIndex;
  } while (loop);
};

export const realTyperDefaultProps: RealTypeOptions & StringTypeOptions = {
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

export default realType;
