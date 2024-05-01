

class Slider {
  constructor(min, max, value = (min + max) / 2) {
    this.min = min;
    this.max = max;
    this.value = value;
    this.x = 0;
    this.y = 0;
    this.w = 20; // default width
    this.h = 100; // default height
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setSize(w, h) {
    this.w = w;
    this.h = h;
  }

  value() {
    return this.value;
  }

  draw(p, c1, c2) {
    let normval = (this.value - this.min) / (this.max - this.min);

    p.push();
    p.stroke(c1);
    p.noFill();
    p.rect(this.x, this.y, this.w, this.h);
    p.noStroke();
    p.fill(c2);
    p.rect(this.x+1, this.y + (this.h*(1.-normval)), this.w-2, this.h*normval);
    p.pop();
  }
}

class SliderGroup {
  constructor() {
    this.sliders = {};
  }

  addSlider(name, min, max, value) {
    this.sliders[name] = new Slider(min, max, value);
  }

  addSliderDict(sliderDict) {
    Object.keys(sliderDict).forEach(key => {
        const [min, max, value = (min + max) / 2] = sliderDict[key]; // sets a default value if none is provided
        this.sliders[key] = new Slider(min, max, value);
      });
  }

  draw(p, c1, c2) {
    Object.keys(this.sliders).forEach(key => {
        this.sliders[key].draw(p, c1, c2);
      });
  }

  posAndSize(x, y, w, h) {
    let keys = Object.keys(this.sliders);
    let spacing = w / keys.length;
    for (let i = 0; i < keys.length; i++) {
      this.sliders[keys[i]].setPosition(x + i * spacing, y);
      this.sliders[keys[i]].setSize(spacing - 10, h); // Adjust spacing to avoid overlap
    }
  }

  getValue(name) {
    if (this.sliders[name]) {
      return this.sliders[name].value();
    }
    return null;
  }
}

