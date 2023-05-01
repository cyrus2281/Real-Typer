# Real-Typer [![npm version](https://badge.fury.io/js/real-typer.svg)](https://badge.fury.io/js/real-typer)
A JavaScript library that gives the effect of typing for texts.
[Live Example](https://real-typer.netlify.app/)


- For Angular check [@Real-Typer/Angular ](https://github.com/cyrus2281/Real-Typer/tree/main/src/Angular/projects/real-typer#readme)

## Using CDN
Import the CDN using `script` tags
```html
<script src="https://cdn.statically.io/gh/cyrus2281/Real-Typer/main/src/JavaScript/dist/real-typer.min.js"></script>
```
## Using NPM
install package with
> npm install real-typer

import the file in your JS file.
```js
import 'real-typer'
```

## Quick Start:

create a html container.
```html
    <div class="typer"></div>
 ```  
make sure you have imported the script using CDN or npm and import.

create an object of RealTyper and pass the html element, the strings, and the options

Then call the `type` method to start typing.
```html
    <script>
        const typer = new RealTyper.Typer(
            document.querySelector(".typer"),
            [
                "First Sample Text",
                "Second Sample Text",
                "Third Sample Text"
            ]);
        const typeInstance = typer.type();
    </script>
```

if you app is not finding `RealTyper` call it with `window` prefix.
```js
    const typer = new window.RealTyper.Typer(document.querySelector(".typer"), "test");
```

### Emitters
You can use `emit` to add an string to the list of strings being typed.
```js
    const index = true;
    typeInstance.emit("New String", index);
```
* `index` is optional and if not passed the string will be added to the end of the list.
* `index` can be a number or true. if it is a number the string will be added to the list at that index. if it is true the string will be added to the last string.

## Customization

the following properties can be changed.
```html
    <script>
        const typer = new RealTyper.Typer(
            document.querySelector(".typer"),
            [
                "First Sample Text",
                "Second Sample Text",
                "Third Sample Text"
            ],
            {
                cursorCharacter : "|",
                cursorBlink: true,
                typeSpeed : 100,
                deleteSpeed : 50,
                holdDelay : 1500,
                pauseDelay : 1000,
                startDelay : 0,
                delete : true,
                deleteLastString : true,
                loop : true,
                loopHold : 1500,
                loopStartIndex : ,
                callback : null,
                callbackArgs : null,
                developerMode : true,
            }
        );
        const typeInstance = typer.type();
    </script>
```


## Interface:
Properties::

    strings (default: undefined)   : Strings to be type, this value can be pass as an argument or be children of the selected component

    htmlElement (default: undefined) : the html component that the strings are written into
       
    cursorCharacter (default: "|")   : value for the cursor symbol. put "" for no cursor

    cursorBlink (default: true)      : whether to blink the cursor or not
    
    typeSpeed (default: 100)         : the speed at which the characters are written
    
    deleteSpeed (default: 50)        : the speed at which the characters are deleted
    
    holdDelay (default: 1500)        : the amount of delay before starting to delete
    
    pauseDelay (default: 1000)       : the amount of delay before starting the next string

    startDelay (default: 0)          : the amount of delay before starting to type since the call of method
    
    delete (default: true)           : whether to delete the string or not
    
    deleteLastString (default: true) : whether to delete the last string or not (only happens if 'delete' is true)
    
    loop (default: true)             : whether to loop or not
    
    loopHold (default: 1500)         : the amount of pause before repeating the cycle
    
    loopStartIndex (default: 0)      : Index of the string that the loop will start from the second cycle and on

    callback (default: null)         : callback function that will run after each cycle

    callbackArgs (default: null)     : argument that will be passed to the callback function

    developerMode (default: false)   : logs errors in the console for debugging [recommend for development]

type instance:

    emit (input: string, index: undefined|number|true)   : to add an string to the list of strings being typed

<br>
<br>
<br>

<small>
Real-Typer

Author: Cyrus Mobini
    
Licensed under the MIT license.
http://www.opensource.org/licenses/mit-license.php

Copyright 2023 [Cyrus Mobini](https://github.com/cyrus2281)
<small>