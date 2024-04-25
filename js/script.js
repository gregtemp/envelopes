"use strict";



// sketch_01.js
let sketch1 = function(p) { // 'p' represents the p5 instance
  p.setup = function() {
    p.createCanvas(200, 100);
    p.background(200); 
  };

  p.draw = function() {
    p.ellipse(p.width/2, p.height/2, 50, 50); // Use 'p' 
  };
};


//
let sketch2 = function(p) { // 'p' represents the p5 instance
    p.setup = function() {
        p.createCanvas(200, 100);
        p.background(0); 
    };

    p.draw = function() {
        p.rect(p.width/2, p.height/2, 50, 50); // Use 'p' 
    };
};


// add sketches to canvas container divs
new p5(sketch1, 'canvas1-container'); // Create instance attached to div
new p5(sketch2, 'canvas2-container');
