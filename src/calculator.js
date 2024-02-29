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
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: console.log("Invalid operator");
    }
}

function updateDisplay(value) {
    const display = document.querySelector(".display");
    if (value === "x²") value = '²';
    display.textContent += `${value} `;
}

function clear() {
    document.querySelector(".display").textContent = "";
}

const calculator = document.querySelector(".calculator");

calculator.addEventListener("click", e => {
    if ((e.target.nodeName === 'BUTTON') && (e.target.className !== "options-button") && (e.target.id !== "equals")) {
        const buttonValue = e.target.textContent;
        updateDisplay(buttonValue);
    }
});

document.getElementById("clear").addEventListener("click", clear);
