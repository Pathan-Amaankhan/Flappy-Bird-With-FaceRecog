var c = document.getElementById("canvas");
var ctx = c.getContext('2d');

ctx.font = "italic bold 30px Verdana";
var textInit = document.getElementById('Initializer');
var countDown = document.getElementById('StartCountdown');
const videoEl = document.getElementById('inputVideo');

var timer;
document.addEventListener('keydown',function(event){
    var i=10;
    if(event.keyCode == 83){
        textInit.innerHTML = 'Starting The Game...<br>Getting Your Face...<br>Please Put Your Face at the Center of your camera...<br>Press Allow To Play...';
        run();
        start();
        draw();
        timer = setInterval(function() {
            countDown.innerHTML = ('Starting in '+String(i)+' or Before.');
            i--;
            if(i==0){
                countDown.innerHTML = '';
            }
        }, 1000);
        setTimeout(() => { startingGame(); }, 10000);
    }
});

var bird,background,pipeNorth,pipeSouth,floor,pipeNorth1Posy,pipeSouth1Posy,pipeNorth2Posy,pipeSouth2Posy,pipeNorth3Posy,pipeSouth3Posy,pipeNorth1Posx,pipeSouth1Posx,pipeNorth2Posx,pipeSouth2Posx,pipeNorth3Posx,pipeSouth3Posx,birdy,xposOfBirdy,currScore;
function startingGame(){
    setInterval(checkBirdyOut,1);
    setInterval(creatingPipes,0);
    setInterval(BirdyPos,1);
    clearInterval(timer);
    countDown.innerHTML = '';
}

function start(){
    bird = new Image();
    bird.src = "images/bird.png";

    background = new Image();
    background.src = "images/background.png";

    pipeNorth = new Image();
    pipeNorth.src = "images/pipeNorth.png";

    pipeSouth = new Image();
    pipeSouth.src = "images/pipeSouth.png";

    floor = new Image();
    floor.src = "images/floor.png";

    pipeNorth1Posy = (-(parseInt(Math.random()*201)));
    pipeSouth1Posy = 342+pipeNorth1Posy;

    pipeNorth2Posy = (-(parseInt(Math.random()*201)));
    pipeSouth2Posy = 342+pipeNorth2Posy;

    pipeNorth3Posy = (-(parseInt(Math.random()*201)));
    pipeSouth3Posy = 342+pipeNorth3Posy;


    pipeNorth1Posx = 550;
    pipeSouth1Posx = 550;

    pipeNorth2Posx = 800;
    pipeSouth2Posx = 800;

    pipeNorth3Posx = 1050;
    pipeSouth3Posx = 1050;

    birdy = 10;
    xposOfBirdy = 40;

    currScore = 0;
}

function draw(){
    ctx.translate(640, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(videoEl,0,0);
    ctx.translate(640, 0);
    ctx.scale(-1, 1);
    //ctx.drawImage(background,288,0);
    //ctx.drawImage(background,570,0);

    ctx.drawImage(bird,xposOfBirdy,birdy,40,40);

    ctx.drawImage(pipeNorth,pipeNorth1Posx,pipeNorth1Posy);
    ctx.drawImage(pipeSouth,pipeSouth1Posx,pipeSouth1Posy);

    ctx.drawImage(pipeNorth,pipeNorth2Posx,pipeNorth2Posy);
    ctx.drawImage(pipeSouth,pipeSouth2Posx,pipeSouth2Posy);

    ctx.drawImage(pipeNorth,pipeNorth3Posx,pipeNorth3Posy);
    ctx.drawImage(pipeSouth,pipeSouth3Posx,pipeSouth3Posy);
    
    ctx.drawImage(floor,0,400);
    ctx.drawImage(floor,288,400);
    ctx.drawImage(floor,570,400);

    ctx.strokeText('SCORE: ',0,510);
    ctx.strokeText(currScore,130,510);
    requestAnimationFrame(draw);
}


function creatingPipes(){
    pipeNorth1Posx-=5;
    pipeSouth1Posx-=5;
    pipeNorth2Posx-=5;
    pipeSouth2Posx-=5;
    pipeNorth3Posx-=5;
    pipeSouth3Posx-=5;
    if(pipeNorth1Posx==-50){
        currScore+=1;
        pipeNorth1Posy = (-(parseInt(Math.random()*201)));
        pipeSouth1Posy = 342+pipeNorth1Posy;

        pipeNorth1Posx=pipeNorth3Posx+250;
        pipeSouth1Posx=pipeSouth3Posx+250;
    }
    if(pipeNorth2Posx==-50){
        currScore+=1;
        pipeNorth2Posy = (-(parseInt(Math.random()*201)));
        pipeSouth2Posy = 342+pipeNorth2Posy;

        pipeNorth2Posx=pipeNorth1Posx+250;
        pipeSouth2Posx=pipeSouth1Posx+250;
    }
    if(pipeNorth3Posx==-50){
        currScore+=1;
        pipeNorth3Posy = (-(parseInt(Math.random()*201)));
        pipeSouth3Posy = 342+pipeNorth3Posy;
        
        pipeNorth3Posx=pipeNorth2Posx+250;
        pipeSouth3Posx=pipeSouth2Posx+250;
    }

}


function checkBirdyOut(){
    if(birdy+37>400 || birdy<0){
        alert('out');
        start();
    }
    for(var i=40;i>-1;i--){
        if(((xposOfBirdy-i>pipeNorth1Posx-34)&&(xposOfBirdy-i<pipeNorth1Posx+10))&&((birdy<pipeNorth1Posy+242)||(birdy+37>pipeSouth1Posy))){
            alert('out');
            start();
            break;
        }
        if(((xposOfBirdy-i>pipeNorth2Posx-34)&&(xposOfBirdy-i<pipeNorth2Posx+10))&&((birdy<pipeNorth2Posy+242)||(birdy+37>pipeSouth2Posy))){
            alert('out');
            start();
            break;
        }
        if(((xposOfBirdy-i>pipeNorth3Posx-34)&&(xposOfBirdy-i<pipeNorth3Posx+10))&&((birdy<pipeNorth3Posy+242)||(birdy+37>pipeSouth3Posy))){
            alert('out');
            start();
            break;
        }
    }
}


async function onPlay() {
   const videoEl = document.getElementById('inputVideo');

   const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 128, scoreThreshold : 0.3 }) 

   
   result = await faceapi.detectSingleFace(videoEl, options).withFaceLandmarks(true)

   if (result) {
      document.getElementById('myDiv01').innerHTML = 'Position Of your Nose, x: '+ 
        (result._unshiftedLandmarks._positions[0]._x) + ', y: '+ 
        (result._unshiftedLandmarks._positions[0]._y);
        
   }
    setTimeout(onPlay,10);
}

async function run() {
   await faceapi.loadTinyFaceDetectorModel('https://hpssjellis.github.io/face-api.js-for-beginners/');
   await faceapi.loadFaceLandmarkTinyModel('https://hpssjellis.github.io/face-api.js-for-beginners/');

      
   const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
   videoEl.srcObject = stream;
}


function BirdyPos(){
    try{ 
        const nose = result.landmarks.getNose();
        birdy = nose[2]._y;
        xposOfBirdy = 600-nose[2]._x;
        textInit.innerHTML = "Instructions:<br>Adjust Camera For Better Experience...<br>Control The Bird Using Nose...<br>Fly Safe, Be Active And Don't Let Her Die...";
    } catch(err){
        console.log('cannot Find Face');
    }
}
    
