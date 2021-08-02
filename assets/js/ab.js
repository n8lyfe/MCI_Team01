var Coutdown = function(elem, options) {

    var timer       = createTimer(),
        offset,
        clock,
        interval,
        rounds,
        timeA,
        timeB,
        audioA,
        audioB,
        select,
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
      audioA = new Audio('assets/audio/soundA.mp3');
      audioB = new Audio('assets/audio/soundB.mp3');
      select = 0;
      timeA = options.timeA;
      timeB = options.timeB;
      rounds = options.rounds;
      played3 = false;
      played2 = false;
      played1 = false;

      clock = timeA;
      render();
    }
  
    function update() {
      clock -= delta();
      render();

      d = Number(clock);
      var ms = d % 1000;
      d = (d - ms) / 1000;
      var s = d % 60;
      if (s === 2 && played3 === false) {
        audioA.play();
        played3 = true;
      }else if (s === 1 && played2 === false) {
        audioA.play();
        played2 = true;
      }else if (s === 0 && played1 === false) {
        audioA.play();
        played1 = true;
      }

      if (clock <= 0 && rounds !== 1 && rounds !== 0) {
        audioB.play();
        if (select === 0) {
          clock = timeB;
          select = 1;
          played1 = false;
          played2 = false;
          played3 = false;
        }else {
          clock = timeA;
          select = 0;
          rounds = --rounds;
          played1 = false;
          played2 = false;
          played3 = false;
        }
      }else if(clock <= 0 && rounds === 1) {
        if (select === 1) {
          clock = 0;
          audioB.play();
          rounds = 0;
          clearInterval(interval);
          interval = null;
          render();
        }else {
          audioB.play();
          clock = timeB;
          select = 1;
          played1 = false;
          played2 = false;
          played3 = false;
        }  
      }else if (rounds === 0) {
        clock = 0;
        audioB.play();
        rounds = 0;
        clearInterval(interval);
        interval = null;
        render();
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

    function setTime(ta,tb,r) {
      options.timeA = ta;
      options.timeB = tb;
      options.rounds = r;
      reset();
    }
  
    // public API
    this.start  = start;
    this.stop   = stop;
    this.reset  = reset;
    this.setTime = setTime;
  };

var a = document.getElementById("a-timer");
var timeA = setCountdown(0,25,0);
var timeB = setCountdown(0,5,0);
var rounds = 5;

var options = {};
options.timeA = timeA;
options.timeB = timeB;
options.rounds = rounds;
aTimer = new Coutdown(a, options);


function setTime() {
  resetWatch();
  var ta = setCountdown(document.getElementById("a-intervall-hours").value,document.getElementById("a-intervall-minutes").value,document.getElementById("a-intervall-seconds").value);
  var tb = setCountdown(document.getElementById("b-intervall-hours").value,document.getElementById("b-intervall-minutes").value,document.getElementById("b-intervall-seconds").value);
  var r = document.getElementById("rounds").value;
  aTimer.setTime(ta, tb, r);
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