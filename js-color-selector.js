/*
 * Copyright (c) 2018, Bing Yang
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

function toHex6(hexColor) {
  var color = hexColor.substr(1);
  color = color.toLowerCase();

  if(color.length == 3) {
    var temp = '';
    for(var i=0; i<3; i++) {
      temp += color.substr(i, 1);
      temp += color.substr(i, 1);
    }
    color = temp;
  }
  color = '#' + color;
  return color;
}
// return an array [red value, green value, blue value] from a color's hex string. each value: 0~255
function rgbValues(hexColor) {
  var color = hexColor.substr(1);
  color = color.toLowerCase();

  if(color.length == 3) {
    var temp = '';
    for(var i=0; i<3; i++) {
      temp += color.substr(i, 1);
      temp += color.substr(i, 1);
    }
    color = temp;
  }
  var redValue = parseInt('0x' + color.substr(0,2));
  var greenValue = parseInt('0x' + color.substr(2,2));
  var blueValue = parseInt('0x' + color.substr(4,2));
  var result = [redValue, greenValue, blueValue];
  return result;
}
// retrieve red, green, or blue value from a hex color string
// call rgbValues() function
function red(hexColor) {
  return rgbValues(hexColor)[0];
}
function green(hexColor) {
  return rgbValues(hexColor)[1];
}
function blue(hexColor) {
  return rgbValues(hexColor)[2];
}

// convert a rgb hex color string to an array values of hsl: [h,s,l]
function rgb2hsl(hexColor) {
  var redValue = red(hexColor) / 255;
  var greenValue = green(hexColor) / 255;
  var blueValue = blue(hexColor) / 255;
  redValue = parseFloat(redValue.toFixed(4));
  greenValue = parseFloat(greenValue.toFixed(4));
  blueValue = parseFloat(blueValue.toFixed(4));

  var maxValue = Math.max(redValue, greenValue, blueValue);
  var minValue = Math.min(redValue, greenValue, blueValue);

  var lValue = (maxValue + minValue) / 2;
  var hValue = 0;

  if (maxValue == minValue) {
    hValue = 0;
  }
  else if (maxValue == redValue) {
    hValue = 60 * (greenValue - blueValue) / (maxValue - minValue);

    if (hValue < 0) {
      hValue += 360;
    }
  }
  else if (maxValue == greenValue) {
    hValue = 60 * (blueValue - redValue) / (maxValue - minValue) + 120;
  }
  else {
    hValue = 60 * (redValue - greenValue) / (maxValue - minValue) + 240;
  }

  var sValue = 0;
  if (lValue == 0 || maxValue == minValue) {
    sValue = 0;
  }
  else if (lValue <= 0.5) {
    sValue = (maxValue - minValue) / (maxValue + minValue);
  }
  else {
    sValue = (maxValue - minValue) / (2 - (maxValue + minValue));
  }
  hValue = Math.floor(hValue);
  sValue = parseFloat(sValue.toFixed(4));
  lValue = parseFloat(lValue.toFixed(4));
  var hslValues = [hValue, sValue, lValue];
  return hslValues;
}

function hsl2rgb(hslValues) {
  var hValue = hslValues[0];
  var sValue = hslValues[1];
  var lValue = hslValues[2];

  var redValue = 0;
  var greenValue = 0;
  var blueValue = 0;

  if (sValue == 0) {
    redValue = lValue * 255;
    greenValue = lValue * 255;
    blueValue = lValue * 255;
  }
  else {
    var qValue = (lValue < 0.5) ? (lValue*(1 + sValue)) : (lValue + sValue - (lValue*sValue));
    var pValue = 2*lValue - qValue;
    var hkValue = hValue/360;
    var trValue = hkValue + 1/3;
    var tgValue = hkValue;
    var tbValue = hkValue - 1/3;
    redValue = 255 * getTcValue(trValue, pValue, qValue);
    greenValue = 255 * getTcValue(tgValue, pValue, qValue);
    blueValue = 255 * getTcValue(tbValue, pValue, qValue);
  }
  redValue = Math.floor(redValue);
  greenValue = Math.floor(greenValue);
  blueValue = Math.floor(blueValue);
  var result = '#';
  if (redValue.toString(16).length == 1) {
    result = result + '0' + redValue.toString(16);
  }
  else {
    result += redValue.toString(16);
  }
  if (greenValue.toString(16).length == 1) {
    result = result + '0' + greenValue.toString(16);
  }
  else {
    result += greenValue.toString(16);
  }
  if (blueValue.toString(16).length == 1) {
    result = result + '0' + blueValue.toString(16);
  }
  else {
    result += blueValue.toString(16);
  }

  return result;
}
function getTcValue(tcValue, pValue, qValue) {
  if (tcValue < 0) {
    tcValue += 1;
  }
  else if (tcValue > 1){
    tcValue -= 1;
  }

  if (tcValue < 1/6) {
    return (pValue + ((qValue - pValue)*6*tcValue));
  }
  else if (tcValue >= 1/6 && tcValue < 0.5) {
    return qValue;
  }
  else if (tcValue >= 0.5 && tcValue < 2/3) {
    return (pValue + ((qValue - pValue)*6*((2/3)-tcValue)));
  }
  else {
    return pValue;
  }

}

function colorPicker(hexColor, contrastRatio, hValue) {
  var tempHColor = [];
  for (var sValue = 0; sValue <= 1; sValue += 0.05) {
    var tempSColor = [];
    for (var lValue = 0; lValue <= 1; lValue += 0.05) {
      var hslValues = [hValue, sValue, lValue];
      var currentColor = hsl2rgb(hslValues);
      if (contrast(hexColor, currentColor) >= contrastRatio) {
        tempSColor.push(currentColor);
      }
    }
    tempHColor.push(tempSColor);
  }
  return tempHColor;
}

function contrast(hexColor1, hexColor2) {
  var temp = (valueL(hexColor1) + 0.05) / (valueL(hexColor2) + 0.05);
  temp = parseFloat(temp.toFixed(4));
  return (temp>1) ? temp : (1/temp);
}

function valueL(hexColor) {
  var redValue = red(hexColor) / 255;
  var greenValue = green(hexColor) / 255;
  var blueValue = blue(hexColor) / 255;
  return 0.2126 * valueRGB(redValue) + 0.7152 * valueRGB(greenValue) + 0.0722 * valueRGB(blueValue);
}
function valueRGB(monoColor) {
  return (monoColor<=0.03928) ? (monoColor/12.92) : Math.pow((monoColor+0.055)/1.055, 2.4);
}
