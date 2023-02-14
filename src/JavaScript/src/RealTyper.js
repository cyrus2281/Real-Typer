/**
 *   RealTyper
 *
 *   A JavaScript module that gives the effect of typing for texts
 *
 *   [Doc](https://github.com/cyrus2281/Real-Typer/tree/main/src/JavaScript#readme)
 *
 *   [Github](https://github.com/cyrus2281)
 *
 * @param {*} cssSelector the html component that the strings are written to(given from). Must be a css selector
 * @param {*} strings     Strings to be type, if not given the children of target would be selected
 */
import { realType, realTyperDefaultProps } from "./utils/RealTyperUtils.js";

export class Typer {
  strings = undefined;
  htmlElement = undefined;
  cursorCharacter = "|";
  typeSpeed = 100;
  deleteSpeed = 50;
  holdDelay = 1500;
  pauseDelay = 1000;
  startDelay = 0;
  delete = true;
  deleteLastString = true;
  loop = true;
  loopHold = 1500;
  loopStartIndex = 0;
  callback = null;
  callbackArgs = null;
  developerMode = false;

  constructor(htmlElement, strings = [], options = {}) {
    this.htmlElement = htmlElement;
    this.strings = strings;
    this.cursorCharacter = options.cursorCharacter ?? this.cursorCharacter;
    this.typeSpeed = options.typeSpeed ?? this.typeSpeed;
    this.deleteSpeed = options.deleteSpeed ?? this.deleteSpeed;
    this.holdDelay = options.holdDelay ?? this.holdDelay;
    this.pauseDelay = options.pauseDelay ?? this.pauseDelay;
    this.startDelay = options.startDelay ?? this.startDelay;
    this.delete = options.delete ?? this.delete;
    this.deleteLastString = options.deleteLastString ?? this.deleteLastString;
    this.loop = options.loop ?? this.loop;
    this.loopHold = options.loopHold ?? this.loopHold;
    this.loopStartIndex = options.loopStartIndex ?? this.loopStartIndex;
    this.callback = options.callback ?? this.callback;
    this.callbackArgs = options.callbackArgs ?? this.callbackArgs;
    this.developerMode = options.developerMode ?? this.developerMode;
  }

  type = () => {
    if (!this.htmlElement instanceof HTMLElement) {
      if (this.developerMode) {
        console.error(
          "The given html element is not an instance of HTMLElement"
        );
      }
      return;
    }
    const setOutput = (output) => {
      this.htmlElement.innerHTML = output;
    };

    realType(
      {
        strings: this.strings ?? realTyperDefaultProps.strings,
        cursorCharacter:
          this.cursorCharacter ?? realTyperDefaultProps.cursorCharacter,
        typeSpeed: this.typeSpeed ?? realTyperDefaultProps.typeSpeed,
        deleteSpeed: this.deleteSpeed ?? realTyperDefaultProps.deleteSpeed,
        holdDelay: this.holdDelay ?? realTyperDefaultProps.holdDelay,
        pauseDelay: this.pauseDelay ?? realTyperDefaultProps.pauseDelay,
        startDelay: this.startDelay ?? realTyperDefaultProps.startDelay,
        delete: this.delete ?? realTyperDefaultProps.delete,
        deleteLastString:
          this.deleteLastString ?? realTyperDefaultProps.deleteLastString,
        loop: this.loop ?? realTyperDefaultProps.loop,
        loopHold: this.loopHold ?? realTyperDefaultProps.loopHold,
        loopStartIndex:
          this.loopStartIndex ?? realTyperDefaultProps.loopStartIndex,
        callback: this.callback ?? realTyperDefaultProps.callback,
        callbackArgs: this.callbackArgs ?? realTyperDefaultProps.callbackArgs,
        developerMode:
          this.developerMode ?? realTyperDefaultProps.developerMode,
      },
      setOutput
    );
  };
}

export default Typer;
