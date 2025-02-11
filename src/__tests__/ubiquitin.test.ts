import { readFileSync } from 'fs';

import type { DataXY } from 'cheminfo-types';
import { parseXY } from 'xy-parser';

import { gsd } from '../gsd';

// var gsd = require("../src/index");
// var optimizePeaks = require("../src/optimize");

describe('Global spectra deconvolution ubiquitin', () => {
  it('HR mass spectra', () => {
    let spectrum: DataXY = parseXY(
      readFileSync(`${__dirname}/data/ubiquitin.txt`, 'utf-8'),
    );
    // var d = new Date();
    // var n = d.getTime();
    // var spectrum=parser.parse(fs.readFileSync('./ubiquitin.txt', 'utf-8'), {arrayType: 'xxyy'});
    // d = new Date();
    // console.log("Parsing time: "+(d.getTime()-n));
    let noiseLevel = 0; // Stat.array.max(spectrum[1])*0.015;

    let result = gsd(spectrum, {
      noiseLevel: noiseLevel,
      minMaxRatio: 0.0,
      smoothY: false,
      realTopDetection: true,
      sgOptions: { windowSize: 7, polynomial: 3 },
    });

    expect(result).toHaveLength(6198);
  });
});
