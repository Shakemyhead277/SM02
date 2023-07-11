let bpmSli = document.getElementById("bpmSli");
let bpmSliVal = document.getElementById("bpmSliVal");

let rows = 12;
let cols = 25;
let inter;
let lastPlayed = 0;

let bpm = bpmSli.value
let interTime = 1000 / (bpm / 60)

let sounds = []
let colors = ["red", "orange", "yellow", "green", "blue", "purple", "red", "orange", "yellow", "green", "blue", "purple"]

var grid = clickableGrid(rows, cols, function(el, row, col, i){
    // console.log("You clicked on element:",el);
    // console.log("You clicked on row:",row);
    // console.log("You clicked on col:",col);
    // console.log("You clicked on item #:",i);

    el.classList.toggle("clicked")

    if (el.classList.contains("clicked")) {
        el.style.backgroundColor = colors[row]
    } else {
        el.style.backgroundColor = ""
    }
});

document.body.appendChild(grid);

function clickableGrid(rows, cols, callback){
    var i=0;
    var grid = document.createElement('table');
    grid.className = 'grid';
    for (var r = 0; r < rows; r++){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c = 0; c < cols; c++){
            var cell = tr.appendChild(document.createElement('td'));
            cell.classList.add(r)
            ++i
            cell.addEventListener('click',(function(el, r, c, i){
                return function(){
                    callback(el, r, c, i);
                }
            })(cell, r, c, i),false);
        }
    }
    return grid;
}

bpmSliVal.innerHTML = bpmSli.value

bpmSli.oninput = () => {
    bpmSliVal.innerHTML = bpmSli.value
    bpm = bpmSli.value
}

function play() {
    interTime = 1000 / (bpm / 60)
    if (document.getElementById("playBtn").innerHTML == "pause") {
        document.getElementById("playBtn").innerHTML = "play"
        clearInterval(inter)
        sounds.forEach(sound => {
            sound.pause()
            sound.removeAttribute('src')
            sound.load()
        })
    } else {
        document.getElementById("playBtn").innerHTML = "pause"

        playing(lastPlayed)
        lastPlayed++
        if (lastPlayed > cols - 1) {
            lastPlayed = 0;
        }

        inter = setInterval(function() {
            playing(lastPlayed)
            lastPlayed++
            if (lastPlayed > cols - 1) {
                lastPlayed = 0;
            }
        }, interTime)
    }
}

function restart() {
    lastPlayed = 0;

    for (let i = 0; i < rows; i++) {
        let preEl = document.getElementsByClassName("grid")[0].getElementsByTagName("tr")[i].childNodes
        preEl.forEach(El => {
            El.classList.remove("playing")
        })
    }
}

function infill() {
    for (let i = 0; i < rows; i++) {
        let els = document.getElementsByClassName("grid")[0].getElementsByTagName("tr")[i].childNodes
        
        els.forEach(el => {
            if (!el.classList.contains("clicked")) {
                el.classList.add("clicked")
                el.style.backgroundColor = colors[i]
            }
        })
    }
}

function playSound(url) {
    const audio = new Audio(url);
    sounds.push(audio)
    audio.play();
}

function playing(colNO) {
    for (let i = 0; i < rows; i++) {
        let preEl = document.getElementsByClassName("grid")[0].getElementsByTagName("tr")[i].childNodes
        preEl.forEach(El => {
            El.classList.remove("playing")
        })
        
        let el = document.getElementsByClassName("grid")[0].getElementsByTagName("tr")[i].childNodes[colNO]
        el.classList.add("playing")

        if (el.classList.contains("clicked")) {
            if (el.classList.contains("0") || el.classList.contains("6")) {
                playSound("audio/cream.mp3")
            }
            if (el.classList.contains("1") || el.classList.contains("7")) {
                playSound("audio/holypandas.mp3")
            }
            if (el.classList.contains("2") || el.classList.contains("8")) {
                playSound("audio/alpacas.mp3")
            }
            if (el.classList.contains("3") || el.classList.contains("9")) {
                playSound("audio/turquoise.mp3")
            }
            if (el.classList.contains("4") || el.classList.contains("10")) {
                playSound("audio/topre.mp3")
            }
            if (el.classList.contains("5") || el.classList.contains("11")) {
                playSound("audio/bluealps.mp3")
            }
        }
    }
}