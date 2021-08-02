var Coutdown = function(elem, options) {

    var timer       = createTimer(),
        offset,
        clock,
        interval,
        rounds,
        timeA,
        audioA,
        audioB;
  
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
      timeA = options.timeA;
      rounds = options.rounds;

      clock = timeA;
      render();
    }
  
    function update() {
      clock -= delta();
      render();

      if (clock === 3000 || clock === 2000 || clock === 1000) {
        audioA.play();
      }

      if (clock <= 0 && rounds !== 1) {
        audioB.play();
        rounds = --rounds;
        clock = timeA;
      }else if(clock <= 0 && rounds === 1) {
        audioB.play();
        clearInterval(interval);
        interval = null;
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
      ms = padLeft(ms,3);
      s = padLeft(s,2);
      m = padLeft(m,2);
      h = padLeft(h,2);
      timer.innerHTML = h+":"+m+":"+s+":"+ms;
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
    function r() {
        return rounds;
    }
    function setTime(t,r) {
      options.timeA = t;
      options.rounds = r;
      reset();
    }
  
    // public API
    this.start  = start;
    this.stop   = stop;
    this.reset  = reset;
    this.setTime = setTime;
    this.r = r;
  };

  var a = document.getElementById("a-timer");
  var timeA = setCountdown(0,1,0);
  var rounds = 10;

  var options = {};
  options.timeA = timeA;
  options.rounds = rounds;
  aTimer = new Coutdown(a, options);

  function setTime() {
    var t = setCountdown(document.getElementById("emom-hours").value,document.getElementById("emom-minutes").value,document.getElementById("emom-seconds").value);
    var r = document.getElementById("rounds").value
    aTimer.setTime(t,r);
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
