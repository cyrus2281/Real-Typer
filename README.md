# Typer.js
This JavaScript module gives the effect of typing for texts displayed on website

Typer.js  is a light weight JavaScript module that allows you to simulate the action of real-time typing for texts on a website. Typer.js gives you lots of customizations to fully customize the simulation for your need.

Sample and a quick guide to module can also be founded on the following link (index.html)

https://typer-js.netlify.app/


## Variables:
    strings (default: Random text)   : Strings to be type, this value can be pass as an argument or be children of the selected component

    cssSelector (default: Null)      : the html component that the strings are written to(given from). Must be a css selector
       
    cursorCharacter (default: "|")   : value for the cursor symbol. put "" for no cursor
    
    typeSpeed (default: 100)         : the speed at which the characters are written
    
    deleteSpeed (default: 50)        : the speed at which the characters are deleted
    
    holdDelay (default: 1500)        : the amount of delay before starting to delete
    
    pauseDelay (default: 1000)       : the amount of delay before starting the next string
    
    delete (default: true)           : whether to delete the string or not
    
    deleteLastString (default: true) : whether to delete the last string or not (only happens if 'delete' is true)
    
    loop (default: true)             : whether to loop or not
    
    loopHold (default: 1500)         : the amount of pause before repeating the cycle
    
    loopStartIndex (default: 0)      : Index of the string that the loop will start from the second cycle and on



## Quick Start:

create a html container. (The children text content will be used as strings if no string is provided)
```html
    <div class="typer">
        <p>First Sample Text</p>
        <p>Second Sample Text</p>
        <p>Third Sample Text</p>
    </div>
 ```  
include the Type.js as a module:

    <script type="module" src="Typer.js"></script>

import the module at your script (make sure to put the type as 'module'):

create an object of Typer with argument of the target css selector

apply any customization that you want

call the type method to start typing
```html
    <script type="module">
        import Typer from "./Typer.js";
        let typer = new Typer(".typer");
        typer.type();
    </script>
```

## Full Customization

the following properties can be changed
```html
    <script type="module">
        import Typer from "./Typer.js";
        let typer = new Typer(".typer");
        typer.strings = ['sample one','sample two','sample three'];
        typer.cursorCharacter = "|";
        typer.typeSpeed = 100;
        typer.deleteSpeed = 50;
        typer.holdDelay = 1500;
        typer.pauseDelay = 1000;
        typer.delete = true;
        typer.deleteLastString = true;
        typer.loop = true;
        typer.loopHold = 1500;
        typer.loopStartIndex = 0
        typer1.type();
    </script>
```





Typer.js

author: Milad Mobini
    
Licensed under the MIT license.
http://www.opensource.org/licenses/mit-license.php

Copyright 2021, EcoCyrus, Milad Mobini

https://www.ecocyrus.com