export const Typer = (function () {
    const values = {
        strings: ["Hi there, Hello", "This is Example", 'Put your own values', "Good Luck"],
        cssSelector: ".typeHere",
        typeSpeed: 100,
        deleteSpeed: 50,
        holdDelay: 1500,
        pauseDelay: 1000,
        deleteLastString: true,
        loop: true,
        loopHold: 1500,
        loopStartIndex: 0
    }

    function type() {
        let container = document.querySelector(values.cssSelector);
        //total time from start
        let currentTypeSpeed = values.typeSpeed
        //word count
        let wordCount = 0
        function typing(string) {
            //word to write
            let word = ""
            //going through each character
            for (const char of string) {
                //adding the character
                word += char
                //applying closure to keep value after web API's response
                let currentWord = word
                currentTypeSpeed += values.typeSpeed
                setTimeout(() => {
                    container.textContent = currentWord + "|";
                }, currentTypeSpeed)
            }
            //waiting before delete
            currentTypeSpeed += values.holdDelay;
            //checking whether to delete the word or not
            if ((wordCount + 1 < values.strings.length) || values.deleteLastString) {
                //deleting the word
                for (let index = word.length; index >= 0; index--) {
                    currentTypeSpeed += values.deleteSpeed
                    let currentCount = wordCount
                    setTimeout(() => {
                        container.textContent = word.slice(0, index) + "|";
                        if (index == 0 && currentCount + 1 == values.strings.length && values.loop) {
                            wordCount = values.loopStartIndex;
                            currentTypeSpeed = values.loopHold;
                            typing(values.strings[wordCount]);
                        }
                    }, currentTypeSpeed)
                }
            }
            currentTypeSpeed += values.pauseDelay;
            //going through each string
            if (++wordCount < values.strings.length) typing(values.strings[wordCount])
        }
        typing(values.strings[0])

    }

    return {
        values,
        type
    }
})()
