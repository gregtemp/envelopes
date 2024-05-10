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
    
    p.createCanvas(p.windowWidth, 250);
    p.textSize(13);
    p.textAlign(p.CENTER, p.CENTER);
};



p.draw = function() {
    p.background(c[2]);
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

    // p.line(0, p.height/2, p.width, p.height/2);
    p.translate(p.width/2 - (env[3].x + 120)/2., p.height/2);
    // p.beginShape()
    // for (let i = 0; i < env.length; i++) {
    //     p.vertex(env[i].x, env[i].y*-100.);
    // }
    // p.endShape();

    // p.stroke(c[4]);
    // p.beginShape();
    let curvePow = p.select("#envCurve").value()/100.;
    let freq = p.select('#freq').value();
    let phase = p.select('#phase').value();
    let prev_y = 0.;
    let prev_delta = 0;
    let prev_delta2 = 0;

    
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
        p.stroke(c[0]);
        p.strokeWeight(2);
        p.line(posx-1, p.pow(prev_y, curvePow)* -100., posx, p.pow(posy, curvePow)* -100.);
        p.stroke(c[4]);
        let curve1 = p.sin((posx-1)/(600) * freq + (phase/100 * p.TWO_PI))*p.pow(prev_y, curvePow);
        let curve2 = p.sin(posx/(600) * freq + (phase/100 * p.TWO_PI))*p.pow(posy, curvePow);
        let delta = (curve1 - curve2);
        let delta2 = (delta - prev_delta);

        p.line(posx-1, curve1 *-100., posx, curve2 *-100.);
        
        // this is nuts, look how nicely the third(? fourth?) derivative captures the discontinuities!
        // p.stroke(0);
        // p.strokeWeight(2);
        // p.point(posx, (delta2 - prev_delta2) * 1000.);
        // p.strokeWeight(2);
        // p.stroke(c[4]);
        let thresh = freq/7;
        if (i < 5) {
            thresh = (50-(p.abs(phase) % 50));
        }
        else if (i > env[1].x - 5 && i < env[1].x + 5) {
            //thresh +=  (10 - p.constrain(p.abs(i - env[2].x), 0, 10)) * (4. * freq);
            thresh = freq/2;
        }
        else if (i > env[3].x - 5 && env[3].x + 5) {
            thresh = freq/2;
        }


        if ((delta2-prev_delta2)*1000. > thresh) {
            p.fill(c[1]);
            p.noStroke();
            p.text("▲", posx-1, p.height/2 - 20);
        }
        if (i == 0 && p.abs(curve2) > 0.065) {
            p.fill(c[1]);
            p.noStroke();
            p.text("▲", posx-1, p.height/2 - 20);
        }
        
        prev_y = posy;
        prev_delta = delta;
        prev_delta2 = delta2;
        
    }
    // p.endShape();

    p.pop();

    // p.stroke(c[1], 50);
    // p.line(100, p.height/2, p.width-100, p.height/2);
    // p.line(p.width/2 - (env[3].x + 120)/2, p.height/2 - 100, p.width/2 - (env[3].x + 120)/2, p.height/2 +100);
       
    
};


};


new p5(envDiscont, "env_discont-container"); // Create instance attached to div