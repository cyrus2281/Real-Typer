# @Real-Typer/react [![npm version](https://badge.fury.io/js/@real-typer%2Freact.svg)](https://badge.fury.io/js/@real-typer%2Freact)

A React component that gives the effect of typing for texts

## Install

> npm install @real-typer/react

## Quick Start:

After adding the component to your module list, you can simply use it with "typer" tags.

You can either pass a string or an array of strings.

```js
import RealTyper from "@real-typer/react";

const App = () => {
  return <RealTyper strings={["Hello", "World"]} />;
};
```

## Customization

the following properties can be customized.

```jsx
<RealTyper
  strings={["Hello", "World", "From", "Real-Typer"]}
  cursorCharacter="|"
  typeSpeed={100}
  deleteSpeed={50}
  holdDelay={1500}
  pauseDelay={1000}
  startDelay={0}
  delete={true}
  deleteLastString={true}
  loop={true}
  loopHold={1500}
  loopStartIndex={0}
  callback={functionName}
  callbackArgs={{}}
  developerMode={true}
  classes="className"
></RealTyper>
```

## Interface:

    strings : string | string[] : (default: Undefined) : Strings to be type, this value can be passed both as an string or an array of strings

    cursorCharacter : string : (default: "|")          : value for the cursor symbol. put "" for no cursor

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

    classes : string : (default: '')                   : class names that will be added to the component

<br>
<br>
<br>

<small>
@Real-Typer/React

Author: Cyrus Mobini

Licensed under the MIT license.
http://www.opensource.org/licenses/mit-license.php

Copyright 2023 [Cyrus Mobini](https://github.com/cyrus2281)
<small>