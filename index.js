function sleep(ms) {
    return new Promise((resolve)=> setTimeout(resolve, ms)) 
}

const parag = "Hi beybey! As you're reading this, I hope it's on or before August 3. I've been lacking inspiration for coding projects recently, and the only thing that could motivate me enough is if it's a gift for you. So, I hope you enjoy! Sending many, many kisses."
const el = document.getElementById("intro-parag")

const sleepTime = 75;

const writeLoop = async() => {
    while(true){
        await sleep(500)
        for (let i = 0; i < parag.length; i++){
            el.innerText = parag.substring(0, i+1);
            await sleep(sleepTime)
        }
        await sleep(5000)
    }
        /* --> code for backtyping
        for (let i = parag.length; i > 0; i--){
            el.innerText = parag.substring(0, i-1);
            await sleep(sleepTime)
        }*/
}

writeLoop();

// date-checklist box

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("Aw don't wanna do anything? ):")
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "&#10005;";
        li.appendChild(span);
    }
    inputBox.value="";
    saveData();
}

listContainer.addEventListener("click", function(e){
    if (e.target.tagName === "LI"){
        e.target.classList.toggle("checked")
        saveData();
    }
    else if (e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showData(){
    listContainer.innerHTML = localStorage.getItem("data")
}
showData();

// GWA calculator

function calculateGwa() {
    var kasGrade = Number(document.getElementById("kas-grade").value);
    var engGrade = Number(document.getElementById("eng-grade").value);
    var mathGrade = Number(document.getElementById("math-grade").value);
    var ctraGrade = Number(document.getElementById("ctra-grade").value);
    var flcd100Grade = Number(document.getElementById("flcd100-grade").value);
    var flcd101Grade = Number(document.getElementById("flcd101-grade").value);
    var display = document.getElementById("display");

    display.value = ((kasGrade + engGrade + mathGrade + ctraGrade + flcd100Grade + flcd101Grade)/6).toFixed(3);
}

var gradeIdList = ["kas-grade", "eng-grade", "math-grade", "ctra-grade", "flcd100-grade", "flcd101-grade"];

gradeIdList.forEach(function(id){
    document.getElementById(id).addEventListener("change",calculateGwa)
});

window.addEventListener("DOMContentLoaded", calculateGwa);
