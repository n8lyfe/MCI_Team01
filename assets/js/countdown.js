var Coutdown = function(elem, options) {

    var timer       = createTimer(),
        offset,
        clock,
        interval,
        audioA,
        audioB,
        played3 = false,
        played2 = false,
        played1 = false;
  
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
      if (!interval && clock != 0) {
        offset   = Date.now();
        interval = setInterval(update, options.delay);
      }
    }
  
    function stop() {
      if (interval && clock != 0) {
        clearInterval(interval);
        interval = null;
      }
    }
  
    function reset() {
      audioA = new Audio('data:audio/mpeg;base64,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');
      audioB = new Audio('data:audio/mpeg;base64,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JJxVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EMT8gMTkLVPMceQgl4Wq+Y3ghFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxP+ARLwtV8xtJOCxBWe9n2CEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xDE9oDEcCtRzD2IYHQEpnj3pCxVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EMTWA8AAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV');
      clock = options.time;
      played3 = false;
      played2 = false;
      played1 = false;
      render();
    }
  
    function update() {
      clock -= delta();
      render();

      //audio
      d = Number(clock);
      var ms = d % 1000;
      d = (d - ms) / 1000;
      var s = d % 60;
      d = (d - s) / 60;
      var m = d % 60;
      var h = (d - m) / 60;
      if (s === 2 && played3 === false && m === 0 && h === 0) {
        audioA.play();
        played3 = true;
      }else if (s === 1 && played2 === false && m === 0 && h === 0) {
        audioA.play();
        played2 = true;
      }else if (s === 0 && played1 === false && m === 0 && h === 0) {
        audioA.play();
        played1 = true;
      }
      //clock
      if (clock <= 0) {
        audioB.play();
        clock = 0;
        render();
        if (interval) {
            clearInterval(interval);
            interval = null;
          }
        }
    }
  
    function render() {
      d = Number(clock);
      var ms = d % 1000;
      d = (d - ms) / 1000;
      var s = d % 60;
      d = (d - s) / 60;
      var m = d % 60;
      var h = (d - m) / 60;
      ms = padLeft(parseInt(ms/10),2);
      s = padLeft(s,2);
      m = padLeft(m,2);
      h = padLeft(h,2);
      timer.innerHTML = h+":"+m+":"+s+":"+ms; 
    }
  
    function delta() {
      var now = Date.now(),
          d   = now - offset;
  
      offset = now;
      return d;
    }

    function padLeft(a, b) {
        var l = (a + '').length;
        if (l >= b) {
            return a + '';
        } else {
            var arr = [];
            for (var i = 0; i < b - l ;i++) {
                arr.push('0');
            }
            arr.push(a);
            return arr.join('');
        }
    }

    function setTime(t) {
      options.time = t;
      reset();
    }
  
    // public API
    this.start  = start;
    this.stop   = stop;
    this.reset  = reset;
    this.setTime = setTime;
  };

  var a = document.getElementById("a-timer");
  var options = {};
  options.time = 60000;
  options.delay = 10;
  var aTimer = new Coutdown(a, options);
  

function setTime() {
  resetWatch();
  var time = setCountdown(document.getElementById("hours").value,document.getElementById("minutes").value,document.getElementById("seconds").value);
  aTimer.setTime(time);
}

function startWatch() {
  aTimer.start();
};

function stopWatch() {
  aTimer.stop();
};

function resetWatch() {
  aTimer.stop();
  aTimer.reset();
};

function setCountdown(h,m,s){
    return (h*3600000) + (m*60000) + (s*1000);
}