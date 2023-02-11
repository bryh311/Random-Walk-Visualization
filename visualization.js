import { Walker } from "./walker.js";

const ALIGNMENT = 20;
let frameNum = 0;
let numWalks = 0;
let frameRate = 60;
let walkers = [];

function init() {
    draw();
    window.requestAnimationFrame(animate);
    const walkCountForm = document.getElementById("walkCountForm");
    walkCountForm.addEventListener("submit", function (event) {
        // console.log(walkCountForm["walkCount"].value);
        event.preventDefault();
        const text = document.getElementById("walkCountText").value;
        setWalks(text)
    })
    const toggleButton = document.getElementById("toggle");
    toggleButton.addEventListener("click", function (event) {
        setWalks("0");
        frameNum = 0;
        draw();
    })

    const frameRateForm = document.getElementById("frameRateForm");
    frameRateForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const text = document.getElementById("frameRateText").value;
        setFramerate(text);
        frameNum = 0;
    })
}


function generateColorString() {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

function setWalks(text) {
    numWalks = parseInt(text);
    if (numWalks === NaN || numWalks < 0) {
        alert("ILLEGAL NUMBER OF WALKS");
        numWalks = 0;
    } else {
        walkers = [];
        for (let i = 0; i < numWalks; i++) {
            walkers.push(new Walker(0,0, generateColorString()))
        }
        draw();
        animate();
    }
}

function setFramerate(text) {
    frameRate = parseInt(text);
    if (frameRate === NAN || frameRate <= 0) {
        alert("ILLEGAL FRAME RATE");
        frameRate = 60;
    }
}

function draw() {
    const canvas = document.getElementById("canvas");
    const width = canvas.width;
    const height = canvas.height;
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d")
        ctx.lineWidth = 1;
        ctx.fillStyle = "gainsboro";
        ctx.fillRect(0,0,width,height);
        if (ALIGNMENT >= 2) {
            // draw grid
            ctx.strokeStyle = "coral"
            ctx.beginPath()
            for (let i = 0; i < width; i += ALIGNMENT) {
                ctx.moveTo(i, 0);
                ctx.lineTo(i, height);
                ctx.stroke();    
            }

            for (let i = 0; i < height; i += ALIGNMENT) {
                ctx.moveTo(0,i);
                ctx.lineTo(width, i);
                ctx.stroke();
            }
        }
    
    }
}

function animate() {
    const canvas = document.getElementById("canvas");
    const width = canvas.width;
    const height = canvas.height;
    let centerX = Math.floor(width /2);
    let centerY = Math.floor(height / 2);
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.lineWidth = ALIGNMENT / 4;
        if (frameNum % Math.floor(60 / frameRate) == 0) {
            for (let walk of walkers) {
                walk.iterate();
                ctx.beginPath();
                ctx.strokeStyle = walk.color;
                ctx.moveTo((walk.coord.x * ALIGNMENT) + centerX, (walk.coord.y * ALIGNMENT) + centerY);
                ctx.lineTo((walk.path[walk.path.length - 2].x * ALIGNMENT) + centerX, (walk.path[walk.path.length - 2].y * ALIGNMENT) + centerY);
                ctx.stroke();
            }
        }

        frameNum++;
        document.getElementById("framecounter").innerHTML = "Frame number: " + frameNum;
        window.requestAnimationFrame(animate)
    }
    
}

init();


