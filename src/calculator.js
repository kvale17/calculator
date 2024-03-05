let calc = {
    a: 0,
    b: 0,
    operator: 0
};

let equalsWasPrevious = 0;
let sqrtSet = 0;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, operator, b) {
    //i.e. operate(6, '-', 4)


    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "x":
            return multiply(a, b);
        case "÷":
            return divide(a, b);
        default:
            console.log("Invalid operator");
    }
}

function updateDisplay(value) {
    const display = document.querySelector(".display");

    if (value !== "=" && value !== "x²") display.textContent += value;
}

function clearDisplay() {
    document.querySelector(".display").textContent = "";
}

function clear() {
    clearDisplay();

    calc = {
        a: 0,
        b: 0,
        operator: 0
    };
}

function setAnswer() {
    if (calc.b) {
        calc.a = operate(parseFloat(calc.a), calc.operator, parseFloat(calc.b));
    }
    calc.b = 0;
    calc.operator = 0;
}

const calculator = document.querySelector(".calculator");

calculator.addEventListener("click", (e) => {
    if (e.target.nodeName === "BUTTON" && e.target.className !== "options-button") {

        let textContent = e.target.textContent;

        if (equalsWasPrevious && e.target.className === "number") {
            clear();
        }

        equalsWasPrevious = 0;

        updateDisplay(textContent);

        if (e.target.id === "pie") {
            textContent = "3.141592653589793238462643383279502884197";
        }

        if ((e.target.className === "number" || e.target.id === "pie") && e.target.id !== "%") {

            if (!calc.a && !calc.operator) {
                calc.a = textContent;
            }
            else if (calc.a && !calc.operator) {
                calc.a = calc.a.toString() + textContent;
            }
            else if (calc.a && calc.operator && !calc.b) {
                calc.b = textContent;
            }
            else if (calc.a && calc.operator && calc.b) {
                calc.b = calc.b.toString() + textContent;
            }
        }
        else {
            if (sqrtSet && calc.a) {
                if (!calc.b && !calc.operator) {
                    calc.a = Math.sqrt(calc.a);

                    sqrtSet = 0;
                }
                else if (calc.b && calc.operator) {
                    calc.b = Math.sqrt(calc.b);

                    sqrtSet = 0;
                }

            }

            if (e.target.className === "operator" && e.target.id !== "equals") {
                if (calc.a && calc.b) {
                    setAnswer();
                }

                if (!calc.a && e.target.id === "minus") {
                    calc.a = textContent;
                }
                else if (!calc.b && e.target.id === "minus" && calc.operator) {
                    calc.b = textContent;
                }
                else if (calc.a && !calc.operator && e.target.id !== "squared" && e.target.id !== "square-root") {
                    calc.operator = textContent;
                }
            }
            else if (e.target.id === "equals") {
                setAnswer();
                clearDisplay();

                if (calc.a) {
                    updateDisplay(calc.a);
                }
                equalsWasPrevious = 1;
            }
            else {
                console.log("Could not determine button click response");
            }
        }

        console.log("calc.a:" + calc.a);
        console.log("calc.operator:" + calc.operator);
        console.log("calc.b:" + calc.b);
        console.log("");
    }
});

document.getElementById("clear").addEventListener("click", clear);

document.getElementById("%").addEventListener("click", () => {
    if (calc.a && !calc.b && !calc.operator) {
        calc.a = calc.a / 100;
    }
    else if (calc.a && calc.b && calc.operator) {
        calc.b = calc.b / 100;
    }
});

document.getElementById("squared").addEventListener("click", () => {
    if (calc.a && !calc.b && !calc.operator) {
        calc.a = calc.a ** 2;
        updateDisplay('²');
    }
    if (calc.a && calc.b && calc.operator) {
        calc.b = calc.b ** 2;
        updateDisplay('²');
    }

});

document.getElementById("square-root").addEventListener("click", () => {
    sqrtSet = 1;
});