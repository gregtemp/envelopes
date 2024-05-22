"use strict";


//
let envDiscont = function(p) { // 'p' represents the p5 instance


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
    
    p.createCanvas(p.windowWidth, 300);
    p.textSize(13);
    p.textAlign(p.CENTER, p.CENTER);
};



p.draw = function() {
    p.background(c[0]);
    env[1].x = p.select('#attack').value();
    env[2].x = p.select('#decay').value() + env[1].x;
    env[2].y = p.select('#sustain').value() / 100.;
    env[3].y = p.select('#sustain').value() / 100.;
    env[4].x = p.select('#release').value() + env[3].x;
    
    // p.text(env[1].x + "\n" + env[2].x + "\n" + env[3].x + "\n" + env[4].x, 50, 100);
    p.strokeWeight(1.5);
    p.push();
    p.noFill();
    p.stroke(c[0]);
    p.translate(p.width/2 - (env[3].x + 120)/2., p.height/4 + 20);
    
    let env_vert_offset = p.height*.75 - 35;

    let sample_rate = 1000.;
    let phase_increment = 0.;
    let phase = 0.;
    let prev_phase = 0.;

    p.beginShape();
    p.vertex(0, env_vert_offset);
    for (let i = 0; i <= env[4].x; i ++) {
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
        else if (posx < env[4].x-1) {
            posy = p.lerp(env[3].y, env[4].y, (posx-(env[3].x))/(env[4].x - (env[3].x)));
            //console.log(posx-1, p.sin((posx-1)/(600) * freq)*p.pow(prev_y, curvePow) *-100., posx, p.sin(posx/(600) * freq)*p.pow(posy, curvePow) *-100.);
        }
        else {
            posy = 0.;
        }
        
        p.noFill();
        p.stroke(c[1]);
        p.strokeWeight(1.5);
        p.vertex(posx, posy* -100. + env_vert_offset);

        let freq = p.pow(posy, 1.4) * 80.;  // Map the envelope value to frequency range 0 to 40
        phase_increment = p.TWO_PI * freq / sample_rate;
        phase += phase_increment;
        // p.line(posx-1, posy * -100., posx, prev_y* -100.);
        p.line(posx -1, p.sin(prev_phase) * -70., posx, p.sin(phase) * -70.);

        prev_phase = phase;
        p.stroke(c[4]);
        p.strokeWeight(2);
    }
    p.endShape();
    p.pop();

};


};


new p5(envDiscont, "simple_env_pitch_container"); // Create instance attached to div