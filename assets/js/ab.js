var Coutdown = function(elem, options) {

    var timer       = createTimer(),
        offset,
        clock,
        interval,
        rounds,
        timeA,
        timeB,
        select;
  
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
      select = 0;
      timeA = options.timeA;
      timeB = options.timeB;
      rounds = options.rounds;

      clock = timeA;
      render();
    }
  
    function update() {
      clock -= delta();
      render();
      if (clock === 0 && rounds !== 1) {
        rounds = --rounds;
        if (select === 0) {
          clock = timeB;
          select = 1;
        }else {
          clock = timeA;
          select = 0;
        }
      }else if(clock === 0 && rounds === 1) {
        clearInterval(interval);
        interval = null;
      }
    }
  
    function render() {
      var state = "";
      d = Number(clock);
      var ms = d % 1000;
      d = (d - ms) / 1000;
      var s = d % 60;
      d = (d - s) / 60;
      var m = d % 60;
      var h = (d - m) / 60;
      ms = padLeft(ms,3);
      s = padLeft(s,2);
      m = padLeft(m,2);
      h = padLeft(h,2);

      if (select === 0) {
        state = "A";
      }else {
        state = "B";
      }
      timer.innerHTML = state+" "+h+":"+m+":"+s+":"+ms; 
      document.getElementById("a-timer-rounds").innerHTML = rounds;
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
  
    // public API
    this.start  = start;
    this.stop   = stop;
    this.reset  = reset;
  };

var a = document.getElementById("a-timer");
var timeA = setCountdown(0,0,10);
var timeB = setCountdown(0,0,5);
var rounds = 6;

var options = {};
options.timeA = timeA;
options.timeB = timeB;
options.rounds = rounds;
aTimer = new Coutdown(a, options);

function startWatch() {
  aTimer.start();
};

function stopWatch() {
  aTimer.stop();
};

function resetWatch() {
  aTimer.reset();
};

function setCountdown(h,m,s){
    return (h*3600000) + (m*60000) + (s*1000);
}