# Typer.js
An Angular component that gives the effect of typing for texts



## Inputs:
    strings : string | string[] : (default: Undefined)     : Strings to be type, this value can be pass as an argument or be children of the selected component
       
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
include the Typer.js as a module:
```html
    <script type="module" src="Typer.js"></script>
```
import the module at your script (make sure to put the type as 'module'):

create an object of Typer with argument of the target css selector.

apply any customization that you want.

call the type method to start typing.
```html
    <script type="module">
        import Typer from "./Typer.js";
        const typer = new Typer(".typer");
        typer.type();
    </script>
```


## Full Customization

the following properties can be changed.
```html
<typer 
  [strings]="'hello'"
  [cursorCharacter]="'|'"
  [typeSpeed]=100
  [deleteSpeed]=50
  [holdDelay]=1500
  [pauseDelay]=1000
  [startDelay]=0
  [delete]=true
  [deleteLastString]=true
  [loop]=true
  [loopHold]=1500
  [loopStartIndex]=0
  [callback]="functionName"
  [callbackArgs]="{}"
  [developerMode]=true
  [styles]="{'background-color': 'black', 'color':'white'}"
  (callBackOutput)="callBackOutputHandler($event)"
  >
</typer>
```





<br>
<br>
<br>

<small>
Typer.js

author: Milad Mobini
    
Licensed under the MIT license.
http://www.opensource.org/licenses/mit-license.php

Copyright 2021, [EcoCyrus](https://www.ecocyrus.com), Milad Mobini 
<small>