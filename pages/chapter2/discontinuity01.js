"use strict";


let discont_01 = function(p) { // 'p' represents the p5 instance

let c = [
    p.color('#392F5A'),
    p.color('#9DD9D2'),
    p.color('#FFF8F0'),
    p.color('#F4D06F'),
    p.color('#FF8811')
]

let flashCount = 255;

p.setup = function() {
    p.createCanvas(p.windowWidth, 200);
    p.ellipseMode(p.CENTER);
    p.rectMode(p.CENTER);
    p.strokeWeight(2);
    p.textAlign(p.CENTER);
};



p.draw = function() {
    p.background(c[0]);
    if (flashCount > 0) {
        p.noStroke();
        p.fill(255, flashCount);
        p.rect(p.width/2, p.height/2, p.width, p.height);
        flashCount -= 15;
    }
    p.noFill();
    p.stroke(c[4]);
    let slen = p.int(p.width*0.7);
    //p.beginShape();
    let sdiff = 0;
    let shaper;
    let disconExists = false;
    for (let i = 0; i < slen; i ++) {
        let posx = i + p.width*0.15;
        let sdiff = shaper;
        shaper = (p.floor(p.noise(2*i/slen)*6)-3)/3;
        if (shaper == 0) shaper = 0.5;
        if (p.abs(shaper - sdiff) > 0.) {
            p.fill(c[1]);
            p.noStroke();
            //p.ellipse(posx, p.height - 30, 6, 6);
            p.text("▲", posx-1, p.height - 30);
            disconExists = true;
        }
        //p.point(posx, shaper*50 + p.height/2);
        p.noFill();
        p.stroke(c[4]);
        p.point(posx, p.sin(i/slen * p.PI * 8.) * shaper * 50 + p.height/2 - 10);
    }
    if (disconExists === false) p.noiseSeed(p.frameCount);
    //p.endShape();
};

p.mousePressed = function() {
    if (p.mouseY > 0 && p.mouseY < p.height) {
        p.noiseSeed(p.frameCount);
        flashCount = 255;
    }
};

};



new p5(discont_01, 'discont_01-container'); // Create instance attached to div