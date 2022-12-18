
const oButton = document.getElementById("oneButton");
const content = document.getElementById("content");
const outputSound = document.getElementById("myAudio");

const ctx = canvas.getContext("2d");

WIDTH = 1200;
HEIGHT = 600;

canvas.width = WIDTH;
canvas.height = HEIGHT;

const track = new Audio('music.mp3');

const audioCtx = new AudioContext();

const analyser = audioCtx.createAnalyser();

const source = audioCtx.createMediaElementSource(track);

source.connect(analyser);

analyser.fftSize = 512;

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

//console.log(dataArray);

function draw(){
    
    const barWidth = canvas.width/bufferLength;
    let barHeight;
    let x = 0;
    let x2 = canvas.width / 2;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    analyser.getByteFrequencyData(dataArray);

    for (i = 0; i < bufferLength; i++){

        barHeight = dataArray[i];

        ctx.save();
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.rotate(i + Math.PI * 2 / bufferLength);

        const red = 255;
        const green = i * barHeight/10;
        const blue = 125;
        
        ctx.fillStyle = "#FFF59E";
        ctx.fillRect(0,canvas.height/8, barWidth, barHeight);
        ctx.fillStyle = `rgb(`+red+`,`+green+`,`+blue+`)`;
        ctx.fillRect(0,0, barWidth, barHeight);

        x += barWidth;

        ctx.restore();
    }

    requestAnimationFrame(draw);
}

$(document).ready(function(){

    $("#oneButton").toggle(

        function(){$("#oneButton");
        oButton.style.background = "green";
        track.play();
        outputSound.play();
    },
        function(){$("#oneButton");
        oButton.style.background = "red";
        track.pause();
        outputSound.pause();
    }
    );
});

draw();


  