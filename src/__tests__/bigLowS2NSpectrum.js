/**
 * Created by acastillo on 2/2/16.
 */
'use strict';

var fs = require('fs');

var peakPicking = require('..');

describe('Global spectra deconvolution NMR spectra', () => {
  test('Should give 120 peaks', () => {
    var spectrum = JSON.parse(
      fs.readFileSync(`${__dirname}/data/bigLowS2NSpectrum.json`, 'utf-8')
    );

    var pp = peakPicking.gsd(spectrum[0], spectrum[1], {
      noiseLevel: 57000.21889405926, // 1049200.537996172/2,
      minMaxRatio: 0.01,
      broadRatio: 0.0025,
      sgOptions: { windowSize: 13, polynomial: 3 }
    });

    peakPicking.post.joinBroadPeaks(pp, { width: 0.25 });

    /* var result = peakPicking.gsd(spectrum[0],spectrum[1], {noiseLevel: 57000.21889405926*0.8,
         minMaxRatio:0.005,
         broadRatio:0.0025,
         sgOptions:{windowSize: 9,
         polynomial: 3}
         }
         );
         console.log(result.length);
         var last = peakPicking.post.joinBroadPeaks(result,{width:0.25});
         console.log(result.length);
         */
  });
});
