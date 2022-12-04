/**
 *   Real-Typer
 *
 *   A JavaScript module that gives the effect of typing for texts
 *
 *   [Doc](https://github.com/cyrus2281/Real-Typer/tree/main/src/Angular/projects/real-typer#readme)
 *
 *   [Github](https://github.com/cyrus2281)
 *
 * @param {*} cssSelector the html component that the strings are written to(given from). Must be a css selector
 * @param {*} strings     Strings to be type, if not given the children of target would be selected
 */
export default class RealTyper {
  strings = undefined;
  cssSelector = undefined;
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

  constructor(cssSelector, strings = []) {
    this.cssSelector = cssSelector;
    this.strings = strings;
  }

  type = () => {
    if (!this._checkValues()) {
      return 0;
    }
    let container = document.querySelector(this.cssSelector);
    //total time from start
    let currentTypeSpeed = this.startDelay;
    //word count
    let wordCount = 0;

    const typing = (string) => {
      //current word count
      let currentCount = wordCount;
      //word to write
      let word = "";
      //going through each character
      for (const char of string) {
        //adding the character
        word += char;
        //applying closure to keep value after web API's response
        let currentWord = word;
        currentTypeSpeed += this.typeSpeed;
        setTimeout(() => {
          container.textContent = currentWord + this.cursorCharacter;
          //if the last word is complete
          if (
            !this.delete &&
            currentWord == string &&
            currentCount + 1 == this.strings.length
          ) {
            //if callback has a function, run it and pass args
            if (this.callback !== null) {
              this.callback(this.callbackArgs);
            }
            //if the loop is true, repeat
            if (this.loop) {
              wordCount = this.loopStartIndex;
              currentTypeSpeed = this.loopHold;
              typing(this.strings[wordCount]);
            }
          }
        }, currentTypeSpeed);
      }
      //checking whether to delete words or not
      if (this.delete) {
        //waiting before delete
        currentTypeSpeed += this.holdDelay;
        //checking whether to delete the word or not
        if (wordCount + 1 < this.strings.length || this.deleteLastString) {
          //deleting the word
          for (let index = word.length; index >= 0; index--) {
            currentTypeSpeed += this.deleteSpeed;
            let currentCount = wordCount;
            setTimeout(() => {
              container.textContent =
                word.slice(0, index) + this.cursorCharacter;
              //if it is the last character of the last word
              if (index == 0 && currentCount + 1 == this.strings.length) {
                //if callback has a function, run it and pass args
                if (this.callback !== null) {
                  this.callback(this.callbackArgs);
                }
                //if loop is true, repeat
                if (this.loop) {
                  wordCount = this.loopStartIndex;
                  currentTypeSpeed = this.loopHold;
                  typing(this.strings[wordCount]);
                }
              }
            }, currentTypeSpeed);
          }
        }
      }
      currentTypeSpeed += this.pauseDelay;
      //going through each string
      if (++wordCount < this.strings.length) typing(this.strings[wordCount]);
    };
    typing(this.strings[0]);
  };

  _checkValues = () => {
    if (!document.querySelector(this.cssSelector)) {
      if (this.developerMode)
        console.error("Could not find the " + this.cssSelector);
      return false;
    }
    if (this.strings.length < 1) {
      let text = [...document.querySelector(this.cssSelector).children].reduce(
        (acc, cur) => {
          acc.push(cur.textContent);
          return acc;
        },
        []
      );
      if (text.length < 1) {
        if (this.developerMode)
          console.warn("Could not find any strings. Adding default values.");
        this.strings = [
          "Hi there, Hello",
          "This is Example",
          "Put your own values",
          "Good Luck",
        ];
      } else {
        this.strings = text;
      }
    }

    if (!(this.loopStartIndex < this.strings.length)) {
      if (this.developerMode)
        console.error(
          "loop start value can not be bigger than length of the strings(" +
            this.strings.length +
            ")"
        );
      return false;
    }
    if (this.callback !== null) {
      if (!(this.callback instanceof Function)) {
        if (this.developerMode)
          console.error("Only a function can be assigned to callback");
        return false;
      }
    }
    return true;
  };
}