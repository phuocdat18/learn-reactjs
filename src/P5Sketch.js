import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const P5Sketch = () => {
  const sketchRef = useRef(null);
  const amplitudes = useRef([]);

  useEffect(() => {
    const sketch = new p5((p) => {
      let angle = 0;
      let amplitude = 100;
      let frequency = 0.02;

      p.setup = () => {
        p.createCanvas(400, 400).parent(sketchRef.current);
      };

      p.draw = () => {
        p.background(0);
        p.translate(p.width / 2, p.height / 2);

        const x = amplitude * p.sin(angle);
        const y = amplitude * p.cos(angle);

        amplitudes.current.push(y);
        if (amplitudes.current.length > p.width) {
          amplitudes.current.shift();
        }

        p.noFill();
        p.stroke(255);
        p.strokeWeight(2);
        p.beginShape();
        for (let i = 0; i < amplitudes.current.length; i++) {
          const xpos = i - amplitudes.current.length + p.width;
          const ypos = p.map(amplitudes.current[i], -amplitude, amplitude, 0, p.height);
          p.vertex(xpos, ypos);
        }
        p.endShape();

        angle += frequency;
      };
    });

    return () => {
      sketch.remove();
    };
  }, []);

  return <div ref={sketchRef} />;
};

export default P5Sketch;