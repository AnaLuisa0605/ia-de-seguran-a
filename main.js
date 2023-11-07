let video;
let objectDetector;
let objects = [];


function preolad(){
    video = createVideo("video.mp4")
}
function setup(){
    canvas = createCanvas(480, 380);
    canvas.center()
    video.hide()
}

function videoLoaded(){
    objectDetector = ml5.objectDetecter('cocossd', modelLoaded)
}
function start(){
    document.getElementById("status").innerHTML = "Status: Detectando objetos";
    objectDetector.detect(video, gotResult)
}
function modelLoaded(){
    console.log("Modelo carregado");
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResults(error, results){
    if(error){
        console.error(error)
    }    
    else{
        objects = results;
        document.getElementById("status").innerHTML = "Status: ";
        document.getElementById("numberOfObjects").innerHTML = "Quantidade de objetos detectados: " + object.length;
    }
}
function draw(){
    image(video, 0, 0, 480, 380)
    for(let i = 0; i < objects.length; i++){
    fill("#FF0000")
    let percent = floor(objects[i].confidence * 100);
    text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
    noFill();
    stroke("#FF0000")
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
    }
}