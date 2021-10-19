import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';


/**
 *   Typer.js for Angular
 *
 *   An Angular component that gives the effect of typing for texts
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
@Component({
  selector: 'typer',
  template:
  `
  <div #typer [ngStyle]="styles"></div>
  `,
  styles: []
})
export class TyperComponent implements AfterViewInit {
  @Input() strings !: string | string[];
  @Input() cursorCharacter : string = "|";
  @Input() typeSpeed: number = 100;
  @Input() deleteSpeed: number = 50;
  @Input() holdDelay: number = 1500;
  @Input() pauseDelay: number = 1000;
  @Input() startDelay: number = 0;
  @Input() delete: boolean = true;
  @Input() deleteLastString: boolean = true;
  @Input() loop: boolean = true;
  @Input() loopHold: number = 1500;
  @Input() loopStartIndex: number = 0;
  @Input() callback !: Function;
  @Input() callbackArgs !: any;
  @Input() styles !: {};
  @Input() developerMode: boolean = true;

  @Output() callBackOutput: EventEmitter<any> = new EventEmitter();

  @ViewChild('typer') typerRef !: ElementRef;
  private typer !: HTMLDivElement;

  ngAfterViewInit(): void {
    this.typer = this.typerRef.nativeElement;
    console.log(this.typer);
    this.type();
  }

  type(): void {
    if (!this._checkValues()) {
      return;
    };
    //total time from start
    let currentTypeSpeed = this.startDelay;
    //word count
    let wordCount = 0
    const typing = (string: string) => {
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
          this.typer.textContent = currentWord + this.cursorCharacter;
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
              this.typer.textContent = word.slice(0, index) + this.cursorCharacter;
              //if it is the last character of the last word
              if (index == 0 && currentCount + 1 == this.strings.length) {
                //if callback has a function, run it and pass args
                if (!!this.callback) {
                  this.callBackOutput.emit(this.callback(this.callbackArgs));
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


  private _checkValues(): boolean {
    if (!this.strings) {
      if (this.developerMode) {
        console.warn("Pass your text to string input like: [strings]=\"yourText\"");
      }
      return false;
    } else {
      if (typeof this.strings == "string") {
        this.strings = [this.strings];
      }

      if (!(this.loopStartIndex < this.strings?.length)) {
        if (this.developerMode) {
          console.error("loop start value can not be bigger than length of the strings(" + this.strings?.length + ")");
        }
        return false;
      }
    }
    if (!!this.callback) {
      if (!(this.callback instanceof Function)) {
        if (this.developerMode) {
          console.error('Only a function can be assigned to callback');
        }
        return false;
      }
    }
    return true;
  }
}
