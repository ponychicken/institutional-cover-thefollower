var getUrlVars = function() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
};

var urlVars = getUrlVars();
if (typeof urlVars.title !== 'undefined') {
  var coverTitle = atob(urlVars.title);
} else {
  var coverTitle = 'Title was not passed';
}

if (typeof urlVars.subtitle !== 'undefined') {
  var coverSubtitle = atob(urlVars.subtitle);
} else {
  var coverSubtitle = 'Subtitle was not passed';
}

var h1 = document.querySelector('h1');
var h2 = document.querySelector('h2');
var h1span = document.querySelector('h1 span');
var h2span = document.querySelector('h2 span');
h1span.innerHTML = coverTitle;
h2span.innerHTML = coverSubtitle;

var screenHeight = window.innerHeight;

var percentage = 50;
var mousePos = screenHeight / 2;

var marginTop = 8;
var marginBottom = 95;

function updatePercentage() {
  var newPercentage = mousePos / screenHeight * 100;
  newPercentage = Math.min(Math.max(newPercentage, marginTop), marginBottom);
  
  percentage = (percentage * 50 + newPercentage) / 51;
  
  h1.style.height = percentage + '%';
  h2.style.height = 100 - percentage + '%';
  
  requestAnimationFrame(updatePercentage);
}

function calculateMargins() {
  screenHeight = window.innerHeight;
  marginTop = h1span.offsetHeight / screenHeight * 100 * 1.5;
  marginBottom = 100 - (h2span.offsetHeight / screenHeight * 100 * 1.5);
}

window.onmousemove = function (e) {
  mousePos = e.clientY;
};

window.onclick = window.ontouchstart = function (e) {
  mousePos = e.clientY;
};

window.onresize = calculateMargins;

calculateMargins();

requestAnimationFrame(updatePercentage);
