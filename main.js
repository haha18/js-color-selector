function selectScheme() {
  if (document.colorForm.selectColor.value != document.colorForm.yourColor.value) {
    document.colorForm.selectColor.value == document.colorForm.yourColor.value;
  }
  var hexColor = document.colorForm.selectColor.value;
  var contrastRatio = parseFloat(document.colorForm.yourContrast.value);

  var txtOneHue = selectAll(hexColor, contrastRatio);

  document.getElementById("outputColors").innerHTML = '';
  document.getElementById("outputColors").innerHTML = txtOneHue[0];
  document.getElementById("outputColors1").innerHTML = '';
  document.getElementById("outputColors1").innerHTML = txtOneHue[1];
}

function selectMono(hexColor, contrastRatio) {
  return selectOneHue(hexColor, contrastRatio, rgb2hsl(hexColor));
}



function selectAll(hexColor, contrastRatio) {
  var resultTxt = '';
  var resultTxt1 = '';

  for(var h = 0; h < 360; h+=10) {
    var txtOneHue = selectOneHue(hexColor, contrastRatio, h);
    resultTxt += txtOneHue[0];
    resultTxt1 += txtOneHue[1];
  }

  var txtList = [resultTxt, resultTxt1];
  return txtList;
}


function selectTargetHue() {
  if (document.colorForm.selectColor.value != document.colorForm.yourColor.value) {
    document.colorForm.selectColor.value == document.colorForm.yourColor.value;
  }
  var hexColor = document.colorForm.selectColor.value;
  var contrastRatio = parseFloat(document.colorForm.yourContrast.value);
  var targetHue = parseInt(document.colorForm.targetHue.value);

  var txtOneHue = selectOneHue(hexColor, contrastRatio, targetHue);

  document.getElementById("outputColors").innerHTML = '';
  document.getElementById("outputColors").innerHTML = txtOneHue[0];
  document.getElementById("outputColors1").innerHTML = '';
  document.getElementById("outputColors1").innerHTML = txtOneHue[1];
}

function selectOneHue(hexColor, contrastRatio, h) {
  var resultTxt = '';
  var resultTxt1 = '';
  resultTxt += '<h3>Hue Value: ' + h + '</h3>';
  resultTxt1 += '<h3>Hue Value: ' + h + '</h3>';
  resultTxt += '<div>';
  resultTxt1 += '<div>';
  var resultColors = colorPicker(hexColor, contrastRatio, h);
  for(var s=0; s < resultColors.length; s++) {
    resultTxt += '<p>';
    resultTxt1 += '<p>';
    for(var l=0; l < resultColors[s].length; l++) {
      resultTxt += '<span class="colorExample" style="font-weight:bold;padding:.5em;color:' + hexColor + ';background-color:' + resultColors[s][l] + ';">';
      resultTxt += resultColors[s][l];
      resultTxt += '</span>';

      resultTxt1 += '<span class="colorExample" style="font-weight:bold;padding:.5em;color:' + resultColors[s][l] + ';background-color:' + hexColor + ';">';
      resultTxt1 += resultColors[s][l];
      resultTxt1 += '</span>';
    }
    resultTxt += '</p>';
    resultTxt1 += '</p>';
  }
  resultTxt += '</div>';
  resultTxt1 += '</div>';
  var txtList = [resultTxt, resultTxt1];
  return txtList;
}

function updateInputColor() {
  var hexColor = document.colorForm.selectColor.value;
  document.colorForm.yourColor.value = hexColor;
  var hsl = rgb2hsl(hexColor);
  document.colorForm.hue.value = hsl[0];
  document.colorForm.saturation.value = Math.floor(100*hsl[1]);
  document.colorForm.lightness.value = Math.floor(100*hsl[2]);
}

function updateSelectColor() {
  var inputColor = document.colorForm.yourColor.value;
  var regex = RegExp('^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$');
  if (regex.test(inputColor)) {
    document.colorForm.selectColor.value = toHex6(inputColor);
    var hsl = rgb2hsl(toHex6(inputColor));
    document.colorForm.hue.value = hsl[0];
    document.colorForm.saturation.value = Math.floor(100*hsl[1]);
    document.colorForm.lightness.value = Math.floor(100*hsl[2]);
  }
  else {
    alert('Error Hex Color String! Try again...');
    document.colorForm.yourColor.focus();
  }
}

function updateColorByHsl() {
  var hValue = document.colorForm.hue.value;
  var sValue = (document.colorForm.saturation.value) / 100;
  var lValue = (document.colorForm.lightness.value) / 100;
  var hsl = [hValue,sValue,lValue];
  var hexColor = hsl2rgb(hsl);
  document.colorForm.selectColor.value = hexColor;
  document.colorForm.yourColor.value = hexColor;
}

function selectByScheme() {
  var hValue = parseInt(document.colorForm.hue.value);
  var schemeValue = parseInt(document.colorForm.selectScheme.value);
  if (document.colorForm.selectColor.value != document.colorForm.yourColor.value) {
    document.colorForm.selectColor.value == document.colorForm.yourColor.value;
  }
  var hexColor = document.colorForm.selectColor.value;
  var contrastRatio = parseFloat(document.colorForm.yourContrast.value);
  var targetHue = hValue + schemeValue;
  if(targetHue >= 360) {
    targetHue -= 360;
  }
  if(targetHue < 0) {
    targetHue += 360;
  }

  var txtOneHue = selectOneHue(hexColor, contrastRatio, targetHue);

  document.getElementById("outputColors").innerHTML = '';
  document.getElementById("outputColors").innerHTML = txtOneHue[0];
  document.getElementById("outputColors1").innerHTML = '';
  document.getElementById("outputColors1").innerHTML = txtOneHue[1];
}
