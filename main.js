img = "";

status = "";

objects = [];

function preload()
{
    alarm = loadSound("alarm.mp3");
}

function setup()
{
    canvas = createCanvas(360, 360);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(360, 360);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded!!");
    status = true;
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }

    console.log(results);
    objects = results;
}

function draw()
{

    image(video, 0, 0, 380, 380);  
    
    

    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);

        for(i = 0; i < objects.length; i++)
        {
            if(objects[i].label == "person")
            {            
                document.getElementById("status").innerHTML = "Status : Objects Detected";
                document.getElementById("baby_status").innerHTML = "Baby Detected";

                fill(r, g, b);
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
                noFill();
                stroke(r, g, b);
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
            else
            {
                document.getElementById("status").innerHTML = "Status : Objects Detected";
                document.getElementById("baby_status").innerHTML = "Baby Not Detected";
                alarm.play();
                alarm.setVolume(10);
            }
            
        }

        if(objects.length = 0)
        {
            document.getElementById("status").innerHTML = "Status : No Object Detected";
            document.getElementById("baby_status").innerHTML = "Baby Not Detected";
            alarm.play();
            alarm.setVolume(10);
        }
    }
   
}