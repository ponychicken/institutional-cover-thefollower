var h1 = document.querySelector('h1');
var h2 = document.querySelector('h2');
var h1span = document.querySelector('h1 span');
var h2span = document.querySelector('h2 span');

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

window.onclick = function (e) {
  mousePos = e.clientY;
};

window.ontouchstart = function (e) {
  mousePos = e.touches[0].clientY;
};

window.onresize = calculateMargins;

getTitleData(function (msg) {
  h1span.innerHTML = msg.title;
  h2span.innerHTML = msg.subtitle;
  
  // Add link to body to have the parent redirect to the magazine URL
  if (msg.isHomepage) {
    document.body.addEventListener('click', function() {
      redirectParent(msg.domain_path);
    });
    document.body.style.cursor = 'pointer';
  }
  
  calculateMargins();
  requestAnimationFrame(updatePercentage);
});
