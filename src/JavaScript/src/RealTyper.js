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
import {
  cursorBlinkingAnimation,
  cursorBlinkingStyle,
  realType,
  realTyperDefaultProps,
} from "./utils/RealTyperUtils.js";

export class Typer {
  strings = undefined;
  htmlElement = undefined;
  cursorCharacter = "|";
  cursorBlink = true;
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
    this.cursorBlink = options.cursorBlink ?? this.cursorBlink;
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
    const outputText = document.createElement("span");
    const cursor = document.createElement("span");
    cursor.innerHTML = this.cursorCharacter;
    if (this.cursorBlink) {
      const style = document.createElement("style");
      style.innerHTML = cursorBlinkingAnimation;
      cursor.style = cursorBlinkingStyle;
      this.htmlElement.append(style);
    }
    this.htmlElement.append(outputText, cursor);
    const setOutput = (output) => {
      outputText.innerHTML = output;
    };

      /**
   * Emit a string to be added to the list of strings to be typed
   * @param {string} input string to be added to the queue
   * @param {undefined|number|true} index index of the string in the queue, if true, it will be the last string in the queue, if undefined, it will add it a new string to the queue
   */
    const emit = realType(
      {
        strings: this.strings ?? realTyperDefaultProps.strings,
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

    return {
      emit,
    };
  };
}

export default Typer;
