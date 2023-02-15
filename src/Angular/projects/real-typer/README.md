# @Real-Typer/Angular [![npm version](https://badge.fury.io/js/@real-typer%2Fangular.svg)](https://badge.fury.io/js/@real-typer%2Fangular)

An Angular component that gives the effect of typing for texts

## Install

> npm install @real-typer/angular

## Adding To App

import `RealTyperModule`

```js
import { RealTyperModule } from "@real-typer/angular";
```

add to `app.module.ts` in `imports` array

```js
@NgModule({
  declarations: [],
  imports: [
    RealTyperModule
  ],
  providers: [],
  bootstrap: []})
```

## Quick Start:

After adding the component to your module list, you can simply use it with "real-typer" tags

```html
<real-typer [strings]="'Hello World'"></real-typer>
```

You can either pass a string or an array of strings.

## Customization

the following properties can be customized.

```html
<real-typer
  [strings]="['Hello','World','From','Real-Typer']"
  [cursorCharacter]="'|'"
  [cursorBlink]="true"
  [typeSpeed]="100"
  [deleteSpeed]="50"
  [holdDelay]="1500"
  [pauseDelay]="1000"
  [startDelay]="0"
  [delete]="true"
  [deleteLastString]="true"
  [loop]="true"
  [loopHold]="1500"
  [loopStartIndex]="0"
  [callback]="functionName"
  [callbackArgs]="{}"
  [developerMode]="true"
  [styles]="{'background-color': 'black', 'color':'white'}"
  (callBackOutput)="callBackOutputHandler($event)"
>
</real-typer>
```

## Interface

### Inputs:

    strings : string | string[] : (default: Undefined) : Strings to be type, this value can be passed both as an string or an array of strings

    cursorCharacter : string : (default: "|")          : value for the cursor symbol. put "" for no cursor

    cursorBlink (default: true)                        : whether to blink the cursor or not

    typeSpeed : number : (default: 100)                : the speed at which the characters are written

    deleteSpeed : number : (default: 50)               : the speed at which the characters are deleted

    holdDelay : number : (default: 1500)               : the amount of delay before starting to delete

    pauseDelay : number : (default: 1000)              : the amount of delay before starting the next string

    startDelay : number : (default: 0)                 : the amount of delay before starting to type since the call of method

    delete : boolean : (default: true)                 : whether to delete the string or not

    deleteLastString : boolean : (default: true)       : whether to delete the last string or not (only happens if 'delete' is true)

    loop : boolean : (default: true)                   : whether to loop or not

    loopHold : number : (default: 1500)                : the amount of pause before repeating the cycle

    loopStartIndex : number : (default: 0)             : Index of the string that the loop will start from the second cycle and on

    callback : Function : (default: null)              : callback function that will run after each cycle

    callbackArgs : any : (default: null)               : argument that will be passed to the callback function

    developerMode : boolean : (default: false)         : logs errors in the console for debugging [recommend for development]

    styles : css object : (default: {})                : css styles if form of javascript object

### Outputs:

    callBackOutput : any                               : Once the callback function is finished, it will emit the output as an event

<br>
<br>
<br>

<small>
@Real-Typer/Angular

Author: Cyrus Mobini

Licensed under the MIT license.
http://www.opensource.org/licenses/mit-license.php

Copyright 2023 [Cyrus Mobini](https://github.com/cyrus2281)
<small>
