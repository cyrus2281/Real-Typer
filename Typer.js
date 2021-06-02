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
    this.delete = true;
    this.deleteLastString = true;
    this.loop = true;
    this.loopHold = 1500;
    this.loopStartIndex = 0

}
Typer.prototype.type = function () {
    let self = this;
    if (!_checkValues(this)) {
        return 0;
    };
    let container = document.querySelector(self.cssSelector);
    //total time from start
    let currentTypeSpeed = self.typeSpeed
    //word count
    let wordCount = 0
    function typing(string) {
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
            currentTypeSpeed += self.typeSpeed;
            setTimeout(() => {
                container.textContent = currentWord + self.cursorCharacter;
                //if the last word is complete and the loop is true, repeat
                if ((!self.delete) && currentWord == string && currentCount + 1 == self.strings.length && self.loop) {
                    wordCount = self.loopStartIndex;
                    currentTypeSpeed = self.loopHold;
                    typing(self.strings[wordCount]);
                }
            }, currentTypeSpeed)
        }
        //checking whether to delete words or not
        if (self.delete) {
            //waiting before delete
            currentTypeSpeed += self.holdDelay;
            //checking whether to delete the word or not
            if ((wordCount + 1 < self.strings.length) || self.deleteLastString) {
                //deleting the word
                for (let index = word.length; index >= 0; index--) {
                    currentTypeSpeed += self.deleteSpeed
                    let currentCount = wordCount
                    setTimeout(() => {
                        container.textContent = word.slice(0, index) + self.cursorCharacter;
                        //if it is the last character of the last word and the loop is true, repeat
                        if (index == 0 && currentCount + 1 == self.strings.length && self.loop) {
                            wordCount = self.loopStartIndex;
                            currentTypeSpeed = self.loopHold;
                            typing(self.strings[wordCount]);
                        }
                    }, currentTypeSpeed)
                }
            }
        }
        currentTypeSpeed += self.pauseDelay;
        //going through each string
        if (++wordCount < self.strings.length) typing(self.strings[wordCount])
    }
    typing(self.strings[0])
}


function _checkValues(self) {
    if (!document.querySelector(self.cssSelector)) {
        console.error("Could not find the " + self.cssSelector)
        return false
    }
    if (self.strings.length < 1) {
        console.log();
        let text = [...document.querySelector(self.cssSelector).children].reduce(
            (acc, cur) => {
                acc.push(cur.textContent);
                return acc;
            },
            []
        );
        if (text.length < 1) {
            self.strings = ["Hi there, Hello", "This is Example", 'Put your own values', "Good Luck"];
        } else {
            self.strings = text
        }
    }

    if (!(self.loopStartIndex < self.strings.length)) {
        console.error("loop start value can not be bigger than length of the strings(" + self.strings.length + ")")
        return false;
    }
    return true;
}