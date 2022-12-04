# Real-Typer [![npm version](https://badge.fury.io/js/real-typer.svg)](https://badge.fury.io/js/real-typer)
This JavaScript module gives the effect of typing for texts displayed on websites.
[Hosted On](https://real-typer.netlify.app/)


- For Angular check [@Real-Typer/Angular ](https://github.com/cyrus2281/Real-Typer/tree/main/src/Angular/projects/real-typer#readme)



## Variables:
    strings (default: Random text)   : Strings to be type, this value can be pass as an argument or be children of the selected component

    cssSelector (default: null)      : the html component that the strings are written to(given from). Must be a css selector
       
    cursorCharacter (default: "|")   : value for the cursor symbol. put "" for no cursor
    
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



## Quick Start:

create a html container. (The children text content will be used as strings if no string is provided.)
```html
    <div class="typer">
        <p>First Sample Text</p>
        <p>Second Sample Text</p>
        <p>Third Sample Text</p>
    </div>
 ```  
include the Real-Typer as a module:
```html
    <script type="module" src="Real-Typer"></script>
```
import the module at your script (make sure to put the type as 'module'):

create an object of RealTyper with argument of the target css selector.

apply any customization that you want.

call the type method to start typing.
```html
    <script type="module">
        import RealTyper from "./Real-Typer";
        const typer = new RealTyper(".typer");
        typer.type();
    </script>
```


## Full Customization

the following properties can be changed.
```html
    <script type="module">
        import RealTyper from "./Real-Typer";
        const typer = new RealTyper(".typer");
        typer.strings = ['sample one','sample two','sample three'];
        typer.cursorCharacter = "|";
        typer.typeSpeed = 100;
        typer.deleteSpeed = 50;
        typer.holdDelay = 1500;
        typer.pauseDelay = 1000;
        typer.startDelay = 0;
        typer.delete = true;
        typer.deleteLastString = true;
        typer.loop = true;
        typer.loopHold = 1500;
        typer.loopStartIndex = 0
        typer.callback = null;
        typer.callbackArgs = null;
        typer.developerMode = true;
        typer1.type();
    </script>
```

<br>
<br>
<br>

<small>
Real-Typer

Author: Cyrus Mobini
    
Licensed under the MIT license.
http://www.opensource.org/licenses/mit-license.php

Copyright 2022 [Cyrus Mobini](https://github.com/cyrus2281)
<small>