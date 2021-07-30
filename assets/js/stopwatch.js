var Stopwatch = function(elem, options) {

    var timer       = createTimer(),
        offset,
        clock,
        interval;
  
    // default options
    options = options || {};
    options.delay = options.delay || 1;
  
    // append elements     
    elem.appendChild(timer);
  
    // initialize
    reset();
  
    // private functions
    function createTimer() {
      return document.createElement("div");
    }
    
    function start() {
      if (!interval) {
        offset   = Date.now();
        interval = setInterval(update, options.delay);
      }
    }
  
    function stop() {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    }
  
    function reset() {
      clock = 0;
      render();
    }
  
    function update() {
      clock += delta();
      render();
    }
  
    function render() {
      d = Number(clock);
      // var h = Math.floor(d / 3600);
      // var m = Math.floor(d % 3600 / 60);
      // //var s = Math.floor(d % 3600 % 60);
      // var ms = d % 1000;
      var ms = d % 1000;
      d = (d - ms) / 1000;
      var s = d % 60;
      d = (d - s) / 60;
      var m = d % 60;
      var h = (d - m) / 60;
      ms = padLeft(ms,3);
      timer.innerHTML = h+":"+m+":"+s+":"+ms; 
    }
  
    function delta() {
      var now = Date.now(),
          d   = now - offset;
  
      offset = now;
      return d;
    }

    function padLeft(positiveInteger, totalDigits) {
      var padding = "00000000000000";
      var rounding = 1.000000000001;
      var currentDigits = positiveInteger > 0 ? 1 + Math.floor(rounding * (Math.log(positiveInteger) / Math.LN10)) : 1;
      return (padding + positiveInteger).substr(padding.length - (totalDigits - currentDigits));
    }
  
    // public API
    this.start  = start;
    this.stop   = stop;
    this.reset  = reset;
  };

var a = document.getElementById("a-timer");
aTimer = new Stopwatch(a);

function startWatch() {
  console.log("start")
  aTimer.start();
};

function stopWatch() {
  aTimer.stop();
};

function resetWatch() {
  aTimer.reset();
};