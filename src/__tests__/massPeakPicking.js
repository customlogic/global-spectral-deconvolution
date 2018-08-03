'use strict';

var CC = require('chemcalc');
var Stat = require('ml-stat');

var peakPicking = require('..');

var spectrum = CC.analyseMF('Cl2.Br2', {
  isotopomers: 'arrayXXYY',
  fwhm: 0.01,
  gaussianWidth: 11
});
var xy = spectrum.arrayXXYY;
var x = xy[0];
var y = xy[1];
var max = Stat.array.max(y);
var noiseLevel = Stat.array.median(y.filter((a) => a > 0)) * 3;
/*
69.938 100
71.935 63.99155
73.932 10.2373
157.837 51.39931
159.835 100
161.833 48.63878

*/

describe('Check the peak picking of a simulated mass spectrum', () => {
  test('Check result', () => {
    var result = peakPicking.gsd(x, y, {
      noiseLevel: noiseLevel,
      minMaxRatio: 0,
      broadRatio: 0,
      smoothY: false,
      realTopDetection: true
    });
    result = peakPicking.post.optimizePeaks(result, x, y, 1, 'gaussian');

    expect(result[0].x).toBeCloseTo(69.938, 1);
    expect(result[0].y).toBeCloseTo(max, 2);
    expect(result[0].width).toBeCloseTo(0.01, 4);

    expect(result[1].x).toBeCloseTo(71.935, 2);
    expect(result[1].y).toBeCloseTo((63.99155 * max) / 100, 3);
    expect(result[1].width).toBeCloseTo(0.01, 4);

    expect(result[2].x).toBeCloseTo(73.932, 1);
    expect(result[2].y).toBeCloseTo((10.2373 * max) / 100, 2);
    expect(result[2].width).toBeCloseTo(0.01, 4);

    expect(result[3].x).toBeCloseTo(157.837, 1);
    expect(result[3].y).toBeCloseTo((51.39931 * max) / 100, 2);
    expect(result[3].width).toBeCloseTo(0.01, 4);

    expect(result[4].x).toBeCloseTo(159.835, 1);
    expect(result[4].y).toBeCloseTo(max, 2);
    expect(result[4].width).toBeCloseTo(0.01, 4);

    expect(result[5].x).toBeCloseTo(161.833, 1);
    expect(result[5].y).toBeCloseTo((48.63878 * max) / 100, 2);
    expect(result[5].width).toBeCloseTo(0.01, 4);
  });
});
