/**
 *   Typer.js
 * 
 *   A JavaScript module that gives the effect of typing for texts
 *  
 *   author: Milad Mobini
 *
 *   Licensed under the MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 *   Copyright 2021, EcoCyrus, Milad Mobini
 *   https://www.ecocyrus.com
 * 
 * 
 * 
 * @param {*} cssSelector the html component that the strings are written to(given from). Must be a css selector
 * @param {*} strings     Strings to be type, if not given the children of target would be selected
 */
export default function Typer(cssSelector, strings = []) {
    this.strings = strings;
    this.cssSelector = cssSelector;
    this.cursorCharacter = "|";
    this.typeSpeed = 100;
    this.deleteSpeed = 50;
    this.holdDelay = 1500;
    this.pauseDelay = 1000;
    this.startDelay = 0;
    this.delete = true;
    this.deleteLastString = true;
    this.loop = true;
    this.loopHold = 1500;
    this.loopStartIndex = 0;
    this.callback = null;
    this.callbackArgs = null;
    this.developerMode = false;

}
Typer.prototype.type = function() {
    if (!_checkValues(this)) {
        return 0;
    };
    let container = document.querySelector(this.cssSelector);
    //total time from start
    let currentTypeSpeed = this.startDelay;
    //word count
    let wordCount = 0;

    const typing = (string) => {
        //current word count
        let currentCount = wordCount
            //word to write
        let word = ""
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
                if ((!this.delete) && currentWord == string && currentCount + 1 == this.strings.length) {
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
            }, currentTypeSpeed)
        }
        //checking whether to delete words or not
        if (this.delete) {
            //waiting before delete
            currentTypeSpeed += this.holdDelay;
            //checking whether to delete the word or not
            if ((wordCount + 1 < this.strings.length) || this.deleteLastString) {
                //deleting the word
                for (let index = word.length; index >= 0; index--) {
                    currentTypeSpeed += this.deleteSpeed
                    let currentCount = wordCount
                    setTimeout(() => {
                        container.textContent = word.slice(0, index) + this.cursorCharacter;
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
                    }, currentTypeSpeed)
                }
            }
        }
        currentTypeSpeed += this.pauseDelay;
        //going through each string
        if (++wordCount < this.strings.length) typing(this.strings[wordCount])
    }
    typing(this.strings[0])
}


function _checkValues(self) {
    if (!document.querySelector(self.cssSelector)) {
        if (self.developerMode)
            console.error("Could not find the " + self.cssSelector);
        return false
    }
    if (self.strings.length < 1) {
        let text = [...document.querySelector(self.cssSelector).children].reduce(
            (acc, cur) => {
                acc.push(cur.textContent);
                return acc;
            }, []
        );
        if (text.length < 1) {
            if (self.developerMode)
                console.warn("Could not find any strings. Adding default values.");
            self.strings = ["Hi there, Hello", "This is Example", 'Put your own values', "Good Luck"];
        } else {
            self.strings = text
        }
    }

    if (!(self.loopStartIndex < self.strings.length)) {
        if (self.developerMode)
            console.error("loop start value can not be bigger than length of the strings(" + self.strings.length + ")");
        return false;
    }
    if (self.callback !== null) {
        if (!(self.callback instanceof Function)) {
            if (self.developerMode)
                console.error('Only a function can be assigned to callback');
            return false;
        }
    }
    return true;
}