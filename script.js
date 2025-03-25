const number = document.getElementById("user-input");
const check = document.getElementById("check-btn");
const clear = document.getElementById("clear-btn");
const results = document.getElementById("result-div");
const validPattern = /^(1\s?)?(\(\d{3}\)|\d{3})(\s|-)?\d{3}(\s|-)?\d{4}$/;
const resultsList = [];

const validateInput = input => {
    if (input.value === "") {
        return alert("Please enter a number");
    } else if (validPattern.test(input.value)) {
        return resultsList.unshift(["Valid US number: " + input.value, true]);
    } else {
        return resultsList.unshift(["Invalid US number: " + input.value, false]);
    }
}

const displayResult = array => {
    document.querySelectorAll(".result-text").forEach(el => el.remove());
    array.forEach(el => {
        const pResult = document.createElement("p");
        pResult.className = el[1] ? "result-text valid" : "result-text invalid";
        pResult.innerText = el[0];
        results.appendChild(pResult);
    });
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const clearResults = async array => {
    number.value = "";
    results.querySelectorAll(".result-text")[0].style.textDecoration = "line-through";
    await sleep(350);
    while (results.querySelectorAll(".result-text").length > 1) {
        results.querySelectorAll(".result-text")[1].style.textDecoration = "line-through";
        await sleep(350);
        results.querySelectorAll(".result-text")[0].remove();
        await sleep(250);
    }
    results.querySelectorAll(".result-text")[0].remove();
    array.length = 0;

}

const validation = () => {
    validateInput(number);
    displayResult(resultsList);
    number.value = "";
}

check.addEventListener("click", () => validation());

number.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        validation();
    }
});

clear.addEventListener("click", () => clearResults(resultsList));
