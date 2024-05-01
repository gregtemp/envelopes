"use strict";



// sketch_01.js
let envWMN = function(p) { // 'p' represents the p5 instance

let c = [
    p.color('#392F5A'),
    p.color('#9DD9D2'),
    p.color('#FFF8F0'),
    p.color('#F4D06F'),
    p.color('#FF8811')
]

let env = [ 
    {
        x: 0.,
        y: 0.
    },
    {
        x: 25.,
        y: 1.
    },
    {
        x: 100.,
        y: 0.5
    },
    {
        x: 300.,
        y: 0.5
    },
    {
        x: 420.,
        y: 0.
    }
]



p.setup = function() {
    p.createCanvas(p.windowWidth, 220);

};

p.draw = function() {
    p.background(c[2]);
    let noteLength = p.select('#noteLength').value();
    // center line
    // p.strokeWeight(2);
    // p.stroke(c[3]);
    //p.line(0, p.height/2 + 10, p.width, p.height/2 + 10);
    
    p.getSliders();
    p.strokeWeight(2);
    p.push();
    p.noFill();
    p.stroke(c[0]);
    p.translate(p.width/2 - 200, p.height/2 + 15);
    p.beginShape()
    p.vertex(env[0].x, env[0].y);
    let a, ny;
    if (noteLength < env[2].x) {
        if (noteLength < env[1].x) {
            a = noteLength / env[1].x;
            ny = a * env[1].y;
        }
        else {
            a = (noteLength - env[1].x) / (env[2].x - env[1].x);
            ny = p.lerp(env[1].y, env[2].y, a);
            p.vertex(env[1].x, env[1].y * -100);
        }
        
        p.vertex(noteLength, ny * -100);
    }
    else {
        ny = env[3].y;
        p.vertex(env[1].x, env[1].y * -100);
        p.vertex(env[2].x, env[2].y * -100);
        p.vertex(env[3].x, env[3].y * -100);
    }
    
    // p.vertex(noteLength, env[3].y * 100);
    p.vertex(env[4].x, env[4].y);
    
    p.endShape();

    
    p.rect(0, 30, noteLength, 40);
    p.noStroke();
    p.fill(c[4]);
    p.ellipse(noteLength, ny*-100, 10, 10);
    p.ellipse(noteLength, 50, 10, 10);
    p.pop();


};

p.getSliders = function() {
    env[1].x = p.select('#attack2').value();
    env[2].x = p.select('#decay2').value() + env[1].x;
    env[2].y = p.select('#sustain2').value() / 100.;
    env[3].y = p.select('#sustain2').value() / 100.;
    env[3].x = p.select('#noteLength').value();
    env[4].x = p.select('#release2').value() + env[3].x;
}

};



// add sketches to canvas container divs
new p5(envWMN, 'envwithmidinote-container'); // Create instance attached to div

