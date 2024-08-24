
class tapple {
    #answerButtons = document.querySelectorAll(".ansButton");
    #answerLabels = document.querySelectorAll(".ansLabel");
    #h1 = document.querySelector("h1");
    #h2 = document.querySelector("h2");
    #middleButton = document.querySelector(".middleButton");
    #timer = 0;
    #gameOver = document.querySelector(".timeOut");
    #timeIntervals = null;
    #timeOuts = null;


    reset() {
        //reset answer buttons
        this.#answerButtons.forEach(function (button) {
            button.checked = false;
            button.disabled = true;
        })
        //reset timer
        countDownSound.pause();
        this.#timer = 0;
        this.#h1.innerText = `Timer: ${this.#timer}`;
        this.#h2.innerText = `Used Alphabets: `;

        //reset list of answer in local storage
        let tempA = [];
        localStorage.setItem("answerList", JSON.stringify(tempA));
        this.clearAllTimeOutInterval();
        this.#middleButton.disabled = false;

    }

    enableAnswerButtons() {
        //enable all answer button
        this.#answerButtons.forEach((button) => {
            if (button.checked === true) {
                button.disabled = true;
            } else {
                button.disabled = false;
            }
        });
    }

    disabledAnswerButtons() {
        //disable all answer button
        this.#answerButtons.forEach((button) => {
            button.disabled = true;
        });
    }

    randomAnswerButtons() {
        let shuffledAlphabet = shuffleArray(letters.slice(0, answers.length));
        localStorage.setItem("order", JSON.stringify(shuffledAlphabet)); //remember order of answer button 
        for (let i = 0; i < answers.length; i++) {
            this.#answerButtons[i].id = shuffledAlphabet[i];
            this.#answerLabels[i].setAttribute("for", shuffledAlphabet[i]);
            this.#answerLabels[i].innerText = shuffledAlphabet[i];
        }
    }

    checkAnswer() {
        try {
            return JSON.parse(localStorage.getItem("answerList"));
        } catch (e) {
            console.log(e);
            return [];
        }

    }

    updateAlphabets() {
        try {
            let temp = JSON.parse(localStorage.getItem("answerList"));
            this.#h2.innerText = `Used Alphabets: ${temp}`;
        } catch (e) {
            console.log(e);
        }

    }

    updateAlphabetsByOrder(x) {
        try {
            let tempA = JSON.parse(localStorage.getItem("answerList"));
            tempA.push(x);
            localStorage.setItem("answerList", JSON.stringify(tempA));
        } catch (e) {
            let tempA = [x];
            localStorage.setItem("answerList", JSON.stringify(tempA));
            console.log(e);
        }
    }

    clearAllTimeOutInterval() {
        clearInterval(this.#timeIntervals);
        clearTimeout(this.#timeOuts);
    }

    displayGameOver(sec) {
        this.#gameOver.classList.toggle("timeOutDisplay");
        setTimeout(() => {
            this.#gameOver.classList.toggle("timeOutDisplay");
        }, sec * 1000);

    }




    play(sec) {
        countDownSound.play();
        this.enableAnswerButtons();
        this.#middleButton.disabled = true;
        this.#timer = 0;
        this.#h1.innerText = "Timer: 0";
        let answerArrayBefore = this.checkAnswer().slice(0);
        const tempIn = setInterval(() => {
            if (this.checkAnswer().length > answerArrayBefore.length) {
                console.log(this.checkAnswer());
                this.#middleButton.disabled = false;
                clearInterval(tempIn);
                clearTimeout(tempTimeOut);
            }
            this.#timer++;
            this.#h1.innerText = `Timer: ${this.#timer}`;
        }, 1000);

        const tempTimeOut = setTimeout(() => {
            countDownSound.pause();
            gameOverSound.play();
            clearInterval(tempIn);
            this.#middleButton.disabled = false;
            this.displayGameOver(3);
            this.reset();
        }, sec * 1000);
        this.#timeIntervals = tempIn;
        this.#timeOuts = tempTimeOut;

    }

}


const mainBody = document.querySelector(".mainBody");
letters.splice(16, 1);
letters.splice(20, 1);
letters.splice(21, 1);
letters.splice(23, 1);
letters.splice(24, 1);
letters.splice(25, 1);
createOrbitE(mainBody, 20, letters);


const labels = document.querySelectorAll(".ansLabel");
const answers = document.querySelectorAll(".ansButton");
const randomButton = document.querySelector("#random");
const reset = document.querySelector("#reset");
const check = document.querySelector("#check");
const middle = document.querySelector(".middleButton");



const tapple1 = new tapple();

try {
    tapple1.updateAlphabets();

    let shuffledAlphabet = JSON.parse(localStorage.getItem("order"));
    for (let i = 0; i < answers.length; i++) {
        answers[i].id = shuffledAlphabet[i];
        labels[i].setAttribute("for", shuffledAlphabet[i]);
        labels[i].innerText = shuffledAlphabet[i];
    }

    let aList = JSON.parse(localStorage.getItem("answerList"));
    answers.forEach(function (answer) {
        aList.forEach(function (a) {
            if (a === answer.id) {
                answer.checked = true;
            }
        });
    });

} catch (e) {
    console.log(e);

}


tapple1.disabledAnswerButtons();

answers.forEach(function (answer) {
    answer.addEventListener("change", function () {
        answerButtonSound.play();
        countDownSound.pause();
        tapple1.updateAlphabetsByOrder(answer.id);
        tapple1.updateAlphabets();
        answer.disabled = true;
        tapple1.disabledAnswerButtons();
    });
});



randomButton.addEventListener("click", function () {
    tapple1.randomAnswerButtons();
    tapple1.reset();
});


reset.addEventListener("click", () => {
    tapple1.reset();
    middle.disabled = false;
});

check.addEventListener("click", () => {
    console.log(tapple1.checkAnswer());
});


middle.addEventListener("click", function () {
    middleButtonSound.play();
    console.log("game start");
    tapple1.play(10);
});











