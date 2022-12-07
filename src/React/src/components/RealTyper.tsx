/**
 *   Real-Typer for React
 *
 *   A React component that gives the effect of typing for texts
 *
 *   author: Cyrus Mobini
 *
 *   Licensed under the MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 *   Copyright 2022 Cyrus Mobini (https://github.com/cyrus2281)
 *
 *
 */

import React from "react";

interface RealTyperProps {
  cursorCharacter: string;
  typeSpeed: number;
  deleteSpeed: number;
  holdDelay: number;
  pauseDelay: number;
  startDelay: number;
  delete: boolean;
  deleteLastString: boolean;
  loop: boolean;
  loopHold: number;
  loopStartIndex: number;
  callback: (args: unknown) => void;
  callbackArgs: unknown;
  developerMode: boolean;
  classes: string;
  strings: string | string[];
}

export default class RealTyper extends React.Component<RealTyperProps> {
  static defaultProps = {
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
    callback: undefined,
    callbackArgs: undefined,
    developerMode: false,
    classes: "",
    stringOutput: "",
  };

  state = {
    stringOutput: ""
  };

  componentDidMount() {
    this.type();
  }

  _checkValues = () => {
    if (!this.props.strings) {
      if (this.props.developerMode) {
        console.warn(
          'Pass your text to string input like: [strings]="yourText"'
        );
      }
      return false;
    } else {
      if (!(this.props.loopStartIndex < this.props.strings?.length)) {
        if (this.props.developerMode) {
          console.error(
            "loop start value can not be bigger than length of the strings(" +
              this.props.strings?.length +
              ")"
          );
        }
        return false;
      }
    }
    if (!!this.props.callback) {
      if (!(this.props.callback instanceof Function)) {
        if (this.props.developerMode) {
          console.error("Only a function can be assigned to callback");
        }
        return false;
      }
    }
    return true;
  };

  type = () => {
    if (!this._checkValues()) {
      return;
    }
    const strings = typeof this.props.strings === "string" ? [this.props.strings] : this.props.strings;

    //total time from start
    let currentTypeSpeed = this.props.startDelay;
    //word count
    let wordCount = 0;
    const typing = (string: string) => {
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
        currentTypeSpeed += this.props.typeSpeed;
        // eslint-disable-next-line no-loop-func
        setTimeout(() => {
          this.setState(
            { stringOutput: currentWord + this.props.cursorCharacter },
            () => {
              //if the last word is complete
              if (
                !this.props.delete &&
                currentWord === string &&
                currentCount + 1 === strings.length
              ) {
                //if callback has a function, run it and pass args
                if (!!this.props.callback) {
                  this.props.callback(this.props.callbackArgs);
                }
                //if the loop is true, repeat
                if (this.props.loop) {
                  wordCount = this.props.loopStartIndex;
                  currentTypeSpeed = this.props.loopHold;
                  typing(strings[wordCount]);
                }
              }
            }
          );
        }, currentTypeSpeed);
      }
      //checking whether to delete words or not
      if (this.props.delete) {
        //waiting before delete
        currentTypeSpeed += this.props.holdDelay;
        //checking whether to delete the word or not
        if (
          wordCount + 1 < strings.length ||
          this.props.deleteLastString
        ) {
          //deleting the word
          for (let index = word.length; index >= 0; index--) {
            currentTypeSpeed += this.props.deleteSpeed;
            let currentCount = wordCount;
            // eslint-disable-next-line no-loop-func
            setTimeout(() => {
              this.setState(
                {
                  stringOutput:
                    word.slice(0, index) + this.props.cursorCharacter,
                },
                () => {
                  //if it is the last character of the last word
                  if (
                    index === 0 &&
                    currentCount + 1 === strings.length
                  ) {
                    //if callback has a function, run it and pass args
                    if (!!this.props.callback) {
                      this.props.callback(this.props.callbackArgs);
                    }
                    //if loop is true, repeat
                    if (this.props.loop) {
                      wordCount = this.props.loopStartIndex;
                      currentTypeSpeed = this.props.loopHold;
                      typing(strings[wordCount]);
                    }
                  }
                }
              );
            }, currentTypeSpeed);
          }
        }
      }
      currentTypeSpeed += this.props.pauseDelay;
      //going through each string
      if (++wordCount < strings.length)
        typing(strings[wordCount]);
    };
    typing(strings[0]);
  };

  render() {
    return <div className={this.props.classes}>{this.state.stringOutput}</div>;
  }
}
