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
    
    p.createCanvas(p.windowWidth, 250);
    p.textSize(15);
    p.textAlign(p.CENTER, p.CENTER);
};



p.draw = function() {
    p.background(c[2]);
    env[1].x = p.select('#attackSlider').value();
    env[2].x = p.select('#decaySlider').value() + env[1].x;
    let freq = 150;
    env[2].y = p.select('#sustainSlider').value() / 100.;
    env[3].y = p.select('#sustainSlider').value() / 100.;
    env[4].x = p.select('#releaseSlider').value() + env[3].x;
    // freq = p.select('#freqSlider').value();
    p.strokeWeight(1.5);
    p.push();
    p.noFill();
    p.stroke(c[0]);
    p.translate(p.width/2 - (env[3].x + 120)/2., p.height/2);
    p.beginShape()
    for (let i = 0; i < env.length; i++) {
        p.vertex(env[i].x, env[i].y*-100.);
    }
    p.endShape();

    p.stroke(c[4]);
    p.beginShape();
    for (let i = 0; i < env[4].x*2; i ++) {
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
        p.vertex(posx, p.sin(posx/(env[3].x + 120) * freq)*posy*100.);
    }
    p.endShape();

    p.pop();

    // p.stroke(c[1], 50);
    // p.line(100, p.height/2, p.width-100, p.height/2);
    // p.line(p.width/2 - (env[3].x + 120)/2, p.height/2 - 100, p.width/2 - (env[3].x + 120)/2, p.height/2 +100);
    if (p.mouseY > p.height/2 - 105 && p.mouseY < p.height/2 + 105) {
        for (let i = 0; i < 4; i ++) {
            let x1 = (p.width/2 - (env[3].x + 120)/2) + env[i].x;
            let x2 = (p.width/2 - (env[3].x + 120)/2) + env[i + 1].x;
            let w1 = env[i + 1].x - env[i].x;
            
            if (p.mouseX > x1 && p.mouseX < x2) {
                p.noStroke();
                p.fill(0, 50);
                if (i != 2) p.rect(x1, p.height/2 - 102, w1, 204);
                
                p.fill(0);
                if (i === 0) {
                    // attack overlay
                    p.text("attack time:\nthe time from the beginning of the envelope to the peak", p.width/2, p.height-18);
                }
                else if (i === 1) {
                    // decay overlay
                    p.text("decay time:\nthe time from the end of the attack phase to the sustain amount", p.width/2, p.height-18);
                }
                else if (i === 2) {
                    // sustain overlay
                    p.fill(0, 50);
                    p.rect(x1, p.height/2, w1, env[3].y * -100);
                    p.fill(0);
                    p.text("sustain amount:\nan amount between 0 and the peak that the envelope stays at after\nthe attack and decay phases are over, and until the midi note ends", p.width/2, p.height-28);
                }
                else if (i === 3) {
                    // release overlay
                    p.text("release time:\nthe time from the end of the midi note until the envelope reaches 0", p.width/2, p.height-18);
                }
            }
        }
    }
    
    
};


};


new p5(sketch2, 'canvas2-container'); // Create instance attached to div