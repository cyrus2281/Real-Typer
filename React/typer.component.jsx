/**
 *   Typer.js for React
 *
 *   A React component that gives the effect of typing for texts
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
 */

 import React from "react";

 export class TyperComponent extends React.Component {
   constructor() {
     super();
     this.state = {
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
   }
 
   componentDidMount() {
     this.setState({ ...this.props }, this.type);
   }
 
   _checkValues = () => {
     if (!this.state.strings) {
       if (this.state.developerMode) {
         console.warn(
           'Pass your text to string input like: [strings]="yourText"'
         );
       }
       return false;
     } else {
       if (typeof this.state.strings == "string") {
         this.setState({strings : [this.state.strings]});
       }
 
       if (!(this.state.loopStartIndex < this.state.strings?.length)) {
         if (this.state.developerMode) {
           console.error(
             "loop start value can not be bigger than length of the strings(" +
               this.state.strings?.length +
               ")"
           );
         }
         return false;
       }
     }
     if (!!this.state.callback) {
       if (!(this.state.callback instanceof Function)) {
         if (this.state.developerMode) {
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
 
     //total time from start
     let currentTypeSpeed = this.state.startDelay;
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
         currentTypeSpeed += this.state.typeSpeed;
         // eslint-disable-next-line no-loop-func
         setTimeout(() => {
           this.setState(
             { stringOutput: currentWord + this.state.cursorCharacter },
             () => {
               //if the last word is complete
               if (
                 !this.state.delete &&
                 currentWord == string &&
                 currentCount + 1 == this.state.strings.length
               ) {
                 //if callback has a function, run it and pass args
                 if (!!this.state.callback) {
                   this.state.callback(this.state.callbackArgs);
                 }
                 //if the loop is true, repeat
                 if (this.state.loop) {
                   wordCount = this.state.loopStartIndex;
                   currentTypeSpeed = this.state.loopHold;
                   typing(this.state.strings[wordCount]);
                 }
               }
             }
           );
         }, currentTypeSpeed);
       }
       //checking whether to delete words or not
       if (this.state.delete) {
         //waiting before delete
         currentTypeSpeed += this.state.holdDelay;
         //checking whether to delete the word or not
         if (
           wordCount + 1 < this.state.strings.length ||
           this.state.deleteLastString
         ) {
           //deleting the word
           for (let index = word.length; index >= 0; index--) {
             currentTypeSpeed += this.state.deleteSpeed;
             let currentCount = wordCount;
             // eslint-disable-next-line no-loop-func
             setTimeout(() => {
               this.setState(
                 {
                   stringOutput:
                     word.slice(0, index) + this.state.cursorCharacter,
                 },
                 () => {
                   //if it is the last character of the last word
                   if (
                     index == 0 &&
                     currentCount + 1 == this.state.strings.length
                   ) {
                     //if callback has a function, run it and pass args
                     if (!!this.state.callback) {
                       this.state.callback(this.state.callbackArgs);
                     }
                     //if loop is true, repeat
                     if (this.state.loop) {
                       wordCount = this.state.loopStartIndex;
                       currentTypeSpeed = this.state.loopHold;
                       typing(this.state.strings[wordCount]);
                     }
                   }
                 }
               );
             }, currentTypeSpeed);
           }
         }
       }
       currentTypeSpeed += this.state.pauseDelay;
       //going through each string
       if (++wordCount < this.state.strings.length)
         typing(this.state.strings[wordCount]);
     };
     typing(this.state.strings[0]);
   };
 
   render() {
     return <div className={this.state.classes}>{this.state.stringOutput}</div>;
   }
 }
 