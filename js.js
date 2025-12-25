let words = [
    "Hello",
    "Code",
    "Town",
    "Javascript",
    "Programming",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Scala",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Playing",
    "good",
    "sad",
    "bad",
    "java",
    "go",
]
let eazyWord = [];
let normalWord = [];
let hardWord = [];
words.forEach(word =>{
    if (word.length >= 8){
        hardWord.push(word);
    }else if (word.length < 8 && word.length >= 5){
        normalWord.push(word);
    }else{
        eazyWord.push(word);
    }
})
let lvls = {
    "eazy": 7,
    "normal": 5,
    "hard": 3,
}
// select element
let messegeLvl = document.querySelector(".messege .lvl");
let messegeSecound = document.querySelector(".messege .seconds");
let btnStart = document.querySelector(".start");
let theWord = document.querySelector(".the-word");
let wordInput = document.querySelector(".input");
let uploudWord = document.querySelector(".uploud-word");
let time = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finnish = document.querySelector(".finnish");
let chooseLvl = document.querySelector(".choose-lvl");
let desh3 = document.querySelector(".des");
let AllData = document.querySelector(".All-data");
let number = -1;
let allData;
if (localStorage.getItem("day") == null){
    allData = [];
}else{
    allData = JSON.parse(localStorage.getItem("day"));
}
// setting add level and time left
function addElement(wordes){
    number++
    if (number == 1){
        defaultLevelSeconds += 3;
    }else{
        defaultLevelSeconds = lvls[defaultLvl];
    }
    time.innerHTML = defaultLevelSeconds;
    messegeLvl.innerHTML = defaultLvl;
    messegeSecound.innerHTML = defaultLevelSeconds;
    time.innerHTML = defaultLevelSeconds;
    scoreTotal.innerHTML = wordes.length;
}
let inputRadio = document.getElementsByName("choose");
let defaultLvl = "normal";
let defaultLevelSeconds = lvls[defaultLvl];
let dataLocal;
inputRadio.forEach((input) => {
    input.addEventListener('change', function() {
        defaultLvl = input.dataset.inp;
    });
});
// disabled paste event
wordInput.onpaste = function(){
    return false;
}
btnStart.addEventListener("click", function(){
    let conatiner = document.querySelector(".conatiner");
    conatiner.classList.add("start_conatiner");
    if (defaultLvl === "normal"){
        addElement(normalWord);
    }else if (defaultLvl === "eazy"){
        addElement(eazyWord);
    }else{
        addElement(hardWord);
    }
    this.remove();
    wordInput.focus();
    wordInput.value = "";
    chooseLvl.remove();
    desh3.remove();
    //generate function
    genWord();
})
function genWord(){
    time.innerHTML = defaultLevelSeconds;
    if (defaultLvl == "normal"){
        addWordsArray(normalWord);
    }else if (defaultLvl == "eazy"){
        addWordsArray(eazyWord);
    }else{
        addWordsArray(hardWord);
    }
}
function createDivinWord (array, word){
    uploudWord.innerHTML = "";
    let wordIndex = array.indexOf(word);
    array.splice(wordIndex, 1);
    array.forEach(word=>{
        let div = document.createElement("div");
        let text = document.createTextNode(word);
        div.appendChild(text);
        // add words in div
        uploudWord.appendChild(div);
    })
}
function playTime(wordArr){
    let startTime = setInterval(() => {
        time.innerHTML--;
        if (time.innerHTML === "0"){
            clearInterval(startTime);
            if (theWord.innerHTML.toLowerCase() === wordInput.value.toLowerCase()){
                wordInput.value = "";
                scoreGot.innerHTML++;
                if (wordArr.length > 0){
                    if (defaultLvl == "normal"){
                        addElement(normalWord);
                    }else if (defaultLvl == "eazy"){
                        addElement(eazyWord);
                    }else{
                        addElement(hardWord);
                    }
                    genWord();
                }else{
                    disabledInp();
                    let span = document.createElement("span");
                    span.className = "good";
                    span.innerHTML = "you win";
                    let btn = document.createElement("button");
                    btn.innerHTML = "again";
                    btn.onclick = reload;                   
                    finnish.style.backgroundColor = "#05579b";
                    btn.style.backgroundColor = "var(--title-color)";
                    finnish.appendChild(span);
                    finnish.appendChild(btn);
                    uploudWord.remove();
                    let scoreResult = scoreGot.innerHTML;
                    saveData("win", scoreResult);
                }
            }else{
                disabledInp();
                let span = document.createElement("span");
                span.className = "bad";
                span.innerHTML = "game over";
                let btn = document.createElement("button");
                btn.innerHTML = "again";
                btn.onclick = reload;
                btn.style.backgroundColor = 'red';
                finnish.style.backgroundColor = "rgb(121, 15, 15)";
                finnish.appendChild(span);
                finnish.appendChild(btn);
                let scoreResult = scoreGot.innerHTML;
                saveData("lose", scoreResult);
            }
        }
    }, 1000);
}
function reload(){
    location.reload();
}
function disabledInp(){
    wordInput.style.pointerEvents = "none";
}
function saveData(statues, score){
    // save data in localstorg
    let date = new Date();
    dataLocal = {
        id: Date.now(),
        title: `the level is ${defaultLvl} the date is ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, ${date.getHours()} : ${date.getMinutes()} and the your score is ${score} of ${scoreTotal.innerHTML} and your ${statues}`,
    }
    allData.push(dataLocal);
    localStorage.setItem("day", JSON.stringify(allData));
    showdatainpage();
}
function showdatainpage(){
    AllData.innerHTML = '';
    let title = document.createElement("h2");
    title.innerHTML = `the all trys (${allData.length})`;
    AllData.appendChild(title);
    // show data in page
    for (let i = 0 ; i < allData.length ; i++){
        let div = document.createElement("div");
        div.className = `data`;
        div.setAttribute("data-index", allData[i].id);
        let span = document.createElement("span");
        span.innerHTML = `${i + 1}.`;
        let p = document.createElement("P");
        p.innerHTML = `${allData[i].title}`
        let delet = document.createElement("button");
        delet.innerHTML = 'delet';
        delet.addEventListener("click", deletElement);
        div.appendChild(span);
        div.appendChild(p);
        div.appendChild(delet);
        AllData.appendChild(div);
    }
}
function deletElement(){
    let parent = this.parentElement;
    for (let i = 0; i < allData.length; i++){
        if (parent.dataset.index == allData[i].id){
            allData.splice(i, 1)
        }
    }
    localStorage.setItem("day", JSON.stringify(allData));
    showdatainpage();
}
function addWordsArray(word){
    addElement(word);
    randomWord = word[Math.floor(Math.random() * word.length)];
    createDivinWord(word, randomWord);
    playTime(word);
    theWord.innerHTML = randomWord;
}
showdatainpage();