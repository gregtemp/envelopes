"use strict";


//
let sketch2 = function(p) { // 'p' represents the p5 instance


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
    
    p.createCanvas(p.displayWidth, 250);

};



p.draw = function() {
    p.background(c[2]);
    env[1].x = p.select('#attackSlider').value();
    env[2].x = p.select('#decaySlider').value() + env[1].x;
    let freq = 100;
    freq = p.select('#freqSlider').value();
    p.strokeWeight(1.5);
    p.push();
    p.noFill();
    p.stroke(c[0]);
    p.translate(p.width/2 - env[4].x/2, p.height/2);
    p.beginShape()
    for (let i = 0; i < env.length; i++) {
        p.vertex(env[i].x, env[i].y*-100.);
    }
    p.endShape();

    p.stroke(c[4]);
    p.beginShape();
    for (let i = 0; i < env[4].x; i ++) {
        let posx = i;
        let posy;
        if (posx < env[1].x) {
            posy = p.lerp(env[0].y, env[1].y, posx/(env[1].x));
        }
        else if (posx < env[2].x) {
            posy = p.lerp(env[1].y, env[2].y, (posx-(env[1].x))/(env[2].x - (env[1].x)));
        }
        else if (posx < env[3].x) {
            posy = p.lerp(env[2].y, env[3].y, (posx-(env[2].x))/(env[3].x - (env[2].x)));
        }
        else if (posx < env[4].x) {
            posy = p.lerp(env[3].y, env[4].y, (posx-(env[3].x))/(env[4].x - (env[3].x)));
        }
        p.vertex(posx, p.sin(posx/env[4].x * freq)*posy*100.);
    }
    p.endShape();

    p.pop();
};


};


new p5(sketch2, 'canvas2-container'); // Create instance attached to div