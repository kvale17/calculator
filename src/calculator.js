let calc = {
    a: 0,
    b: 0,
    operator: 0
};

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

    if (value === "x²") value = "²";
    if (value !== "=") display.textContent += value;
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
    calc.a = operate(parseFloat(calc.a), calc.operator, parseFloat(calc.b));
    calc.b = 0;
    calc.operator = 0;
}

const calculator = document.querySelector(".calculator");

calculator.addEventListener("click", (e) => {
    if (e.target.nodeName === "BUTTON" && e.target.className !== "options-button") {

        const textContent = e.target.textContent;
        updateDisplay(textContent);

        if (e.target.className === "number") {
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
        else if (e.target.className === "operator" && e.target.id !== "equals") {
            if (calc.a && calc.b) {
                setAnswer();
            }

            calc.operator = textContent;
        }
        else if (e.target.id === "equals" && calc.b) {
            setAnswer();

            clearDisplay();
            updateDisplay(calc.a);
        }
        else {
            console.log("Could not determine button click response");
        }

        console.log("calc.a:" + calc.a);
        console.log("calc.operator:" + calc.operator);
        console.log("calc.b:" + calc.b);
        console.log("");
    }
});

document.getElementById("clear").addEventListener("click", clear);
