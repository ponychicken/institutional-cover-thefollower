var h1 = document.querySelector('h1');
var h2 = document.querySelector('h2');

h1.innerText = coverTitle;
h2.innerText = coverSubtitle;

var screenHeight = window.innerHeight;

window.onmousemove = function (e) {
  var percentage = e.clientY / screenHeight * 100;
  percentage = Math.min(Math.max(percentage, 8), 95);
  h1.style.height = percentage + '%';
  h2.style.height = 100 - percentage + '%';
};
