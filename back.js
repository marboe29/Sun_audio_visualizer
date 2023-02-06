const outputSound = document.querySelector("audio");
const canvasRain = document.getElementById("canvasRain")
const ctx = canvasRain.getContext("2d");

const canvasSun = document.getElementById("canvasSun")
const ctxSun = canvasSun.getContext("2d");

const canvasLand = document.getElementById("canvasLand")
const ctxLand = canvasLand.getContext("2d");

WIDTH = 800;
HEIGHT = 500;

canvasRain.width = WIDTH;
canvasRain.height = HEIGHT;

canvasSun.width = WIDTH;
canvasSun.height = HEIGHT;

canvasLand.width = WIDTH;
canvasLand.height = HEIGHT;

const track = new Audio("music/Sugar.mp3");

const audioCtx = new AudioContext();

const analyser = audioCtx.createAnalyser();

const source = audioCtx.createMediaElementSource(track);

source.connect(analyser);

const rainArray = [];

function defRain() {

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvasRain.width, canvasRain.height);
    
    for (let i = 0; i < rainArray.length; i++) {
    
    rainArray[i].y += rainArray[i].dy - dataArray[i] / 50;
      
    ctx.beginPath()
    ctx.roundRect(rainArray[i].x, rainArray[i].y, rainArray[i].width, rainArray[i].height,10)
    ctx.stroke();

    }
    
    requestAnimationFrame(defRain);
    //console.log(dataArray);
}

function addRain() {

    const width = Math.floor(Math.random() * 0) + 1;
    const height = Math.floor(Math.random() * 10) + 8;
    const x = Math.random() * (canvasRain.width - width);
    const y = 0;
    const dy = 2;
  
    const grad = ctx.createLinearGradient(0,0,0,canvasRain.height / 1);
    grad.addColorStop(0,"#005182");
    grad.addColorStop(0.5,"#ff4a6a");
    grad.addColorStop(1,"white");
  
    const color = grad;
    ctx.strokeStyle = color;
    
    rainArray.push({ x, y, width, height, dy, color });

}

defRain();

function defSun() {

    let bufferLength = analyser.frequencyBinCount /4;
    let dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);
    //console.log(bufferLength);
    let barWidth = canvasSun.width/bufferLength;
    let barHeight;
    let x = 0;

    ctxSun.clearRect(0,0,canvasSun.width,canvasSun.height);

    for (i = 0; i < bufferLength; i++){

        barHeight = dataArray[i] /2;

        ctxSun.save();
        ctxSun.translate(canvasSun.width/1.3,canvasSun.height/3);
        ctxSun.rotate(i + Math.PI * 2 / bufferLength);

        const red = 255;
        const green = i * barHeight/10;
        const blue = 125;
        
        ctxSun.fillStyle = "#FFF59E";
        ctxSun.fillRect(0,canvasSun.height/8, barWidth, barHeight);
        ctxSun.fillStyle = `rgb(`+red+`,`+green+`,`+blue+`)`;
        ctxSun.fillRect(0,0, barWidth, barHeight);

        x += barWidth;

        ctxSun.restore();
    }

    requestAnimationFrame(defSun);

}

defSun();

function defSea() {

    let bufferLength = analyser.frequencyBinCount /4;
    let dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);
    
    let barWidth = canvasLand.width/bufferLength;
    let barHeight;
    let x = 0;
    let x2 = canvasLand.width / 2;

    ctxLand.clearRect(0,0,canvasLand.width,canvasLand.height);

    for (i = 0; i < bufferLength; i++){

        barHeight = dataArray[i];

        let grad = ctx.createLinearGradient(0,0,0,canvasLand.height);
        grad.addColorStop(0,"white");
        grad.addColorStop(0.5,"#ff4a6a");
        grad.addColorStop(1,"#44A7C4");
        let color = grad;
        //grass #83C760 sea #44A7C4

        let width = Math.floor(Math.random() * 0) + 1;

        ctxLand.beginPath()
        ctxLand.roundRect(canvasLand.width /2 - x, canvasLand.height - barHeight /2, width, barHeight, 10)
        ctxLand.roundRect(x2, canvasLand.height - barHeight /2, width, barHeight, 10)
        ctxLand.stroke();

        ctxLand.beginPath()
        ctxLand.roundRect(canvasLand.width /1 - x, canvasLand.height - barHeight /2, width, barHeight, 10)
        ctxLand.roundRect(x, canvasLand.height - barHeight /2, width, barHeight, 10)
        ctxLand.stroke();

        ctxLand.strokeStyle = color;

        x += barWidth;
        x2 += barWidth;
    }

    requestAnimationFrame(defSea);
}

defSea();

//chrome user gesture policy
function userGest() {

    document.getElementById("userButton").innerHTML = "Running chrome";
    if (audioCtx.state === 'suspended'){
        audioCtx.resume();
    }
    track.play();
    outputSound.play();
    //adds rectangle every seconds
    setInterval(addRain, 200);
}