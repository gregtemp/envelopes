"use strict";


let sketch1 = function(p) { // 'p' represents the p5 instance

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
    p.createCanvas(p.windowWidth, 200);
    p.ellipseMode(p.CENTER);
    p.rectMode(p.CENTER);
    p.strokeWeight(2);
};



p.draw = function() {
    p.background(c[2]);

    p.push();
    p.stroke(c[4]);
    p.fill(c[0]);
    p.translate(p.width/2 - env[4].x/2, p.height/3+50);
    p.beginShape()
    for (let i = 0; i < env.length; i++) {
        p.vertex(env[i].x, env[i].y*-100.);
    }
    p.endShape();
    
    p.noStroke();
    p.fill(c[4]);
    let posx = p.frameCount%420;
    let posy = 0;
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
    p.ellipse(posx, posy*-100., 15, 15);

    p.fill(c[0]);
    p.ellipse(-25, posy*-100., 15, 15);
    p.ellipse(env[4].x+25, posy*-100., 15, 15);
    p.pop();

    p.stroke(c[0]);
    p.fill(c[4]);
    p.ellipse(p.width/2 - 100, p.height-40, posy*60, posy*60);
    p.push();
    p.translate(p.width/2 + 100, p.height-40);
    p.rotate(p.PI*posy);
    p.rect(0, 0, 50, 10);
    p.pop();



    
};


};


new p5(sketch1, 'canvas1-container'); // Create instance attached to div