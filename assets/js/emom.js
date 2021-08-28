var Coutdown = function(elem, options) {

    var timer       = createTimer(),
        offset,
        clock,
        interval,
        rounds,
        timeA,
        audioA,
        audioB,
        played3 = false,
        played2 = false,
        played1 = false;
  
    // default options
    options = options || {};
    options.delay = options.delay || 1;
    options.rounds = options.rounds || 1;
  
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
      audioA = new Audio('data:audio/mpeg;base64,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WUABdxJAwOAy0a94cktNvk1VjMZrU3cq0qmYz38a1buOOt7xrVuv2XERUWoimuuj//////////////////1//////////////z8ruKJMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//uQxPeAMQITa/nuMQgAADSDgAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV');
      audioB = new Audio('data:audio/mpeg;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAAWAAAMgQAvLy8vQEBAQEBKSkpKU1NTU1NdXV1dZmZmZmZwcHBwenp6enqDg4ODjY2NjY2WlpaWoKCgoKCpqampqbOzs7O9vb29vcbGxsbQ0NDQ0NnZ2dnj4+Pj4+zs7Oz29vb29v////8AAAA8TEFNRTMuMTAwBK8AAAAAAAAAABUgJAYsQQABzAAADIFyV5cMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//ugxAAAApgZVdQwACkOB2z7OvSAEQAAJK3wAAB+J1zgGLfAR/mRz8w8AMABVrMCaAKAAAAAABSowiHZaYIRBwQuFxl4OxgKDRzMZ5gkNJhaAroGIgBtSMRwRZgEDU9oKE8BHi1/has4vWcHhZXHcDLe8AAAAEErRniLvMLGCJloAKVGDAJErtjqrGzKmi1uGQE6LgwUnzwBopfRSsKCZGFIGKxgKQDSNCWphEF7xS3DkvpIxT4KlzAybPAAAABQZDVS4uiro0JOX1DZpMPXmOhmFAAmTITFWBEqd+4EDNc8AEICrEcEIbs8GYmEfpiYSWoWIXTd8hi3MY6MZznYJUxBTUUzLjEwMKq2MDGd8AAAAENR5zZla2rEzgGIKX4kMVsCnM0F0YK6MFMMbO6nyCBkbPAAQULyTtJVNFJYBbABoAMhafaEL8kOWZ0C0xGCXFVMQU1FMy4xMDBV2VBTjfAAAABUQcxS8IArs1EOOgbkBzaPYGwzCVsENEMbxkjq1AAxrngBbIGFEIApGAhgZkfSZkCmdSmpZ5gS/ZdZadFbc3KiSkxBTUUzLjEwMKrXUFKe8AAAAGsFl3YWHUwMczJTRKGChCgC84+HIo3hzqxXv4l5cgQFvwBAKWySFAIlygGRpGkbGACwyo0H6iR/K2MdKuq+ZY2qTEFNRTMuMTAwpxBDbfAAAABu//tAxM4AxKgpY92jACCMhWu5jeCEqWi0y8jpigjF6gBJACB0xy/joM3nLYGB3MCQvpCiBAt+AIpF6V7IUsGMgTgaUHqI9tPchEz5YWGqVpURuSCBp3tMQU1FMy4xMLcAQknwAAAABqiT44IR3Z4OxMFVUwuFTJAtYXrftjknvSOcttbiFfWsYGT74ACqjenMVe0AieTiSd+JDFKCUKxkqlzIZqQY2dwn0kxBTUUzLjEwMKq4IHP/+xDE+gDEqC1XzGmEoI8FavmNvJRs8AAAAC6ohMm6QqaKQwBF8AgIlF0IxSVCQ5ZnQLTEYJcXCAZPvgDHg4iV4KQmGcHHBrBrAIHpzjARoi54hXAoOZgTFcX1TEFNRVVVVXYAUlrwAP/7EMT6AMSgK1nMaeRgiIVreY28lAAAWGTlTSCxW5CJZjuXmUAaazKlBIGBJ8xay/U7fj8SpcrYgM33wBwC4bWFA2sBUplEODncHAWEC42Zq4jdI5b+RuNyzNVMQU1FVVVVdQAgWvAA//sQxPqAxIQpX8xl5GiRBSr5jeCFAABIlAMoKWmYaBQUaAmhqkGD1VHBENmKPzu0wHTKpkOp92SYIr54AoaIkITwY5kYgkYbKAowLTqnMABGAC/WI6MZ3isf0UxBTUUzLjEwMFWoMED/+xDE+oDEkCthzGnkoJAFqrmNvIx98AAAAEwi9KfQklkwGScGSLtRo+nutqClyw1VAsVWFCqL6cQU1rwBG4kOk4MrZ4QxBEBMAgkwQLsIHwOxyT3oXOW33lG1TLdAMXzwAAAARxKFMf/7EMT7AMSsK1vMbYTgkgWqOY3ghEQvVAJnOIBH34cMUoSfbKVC/ImVw/VbqfSgAAALAAAOAIUGyXyQgGAGwKEMYSikBhhhJDlUmz4dB1OKEzzyyexKLuv//6lMQU1FMy4xMLYwMZzw//sQxPuAxPwtU8xzBCCLBas5jTyUAAAAc9AY46mjEzAI2dQPIBgdTNQyCEJbsSsKEaAUG3a7ACkteALDJypVBYrchAsyDJzLANOJE5QaJaSfMWsv1Lb8ljVL1UxBTUUzLjEwMFVVuED/+xDE+oDEjCtbzG3kYJAFqzmNMJxUrvAAAACIKZsoRPZQDWmQrhzsFBFAC87dwJQ62Q61Ar38S8KQEDX4AqVIprqgy7TC41C6A20iy2BQ14Q5lC+NFXVfKmNpTEFNRTMuMTAwVVXHEP/7EMT8AMT4LVPMcwQgjgVreY3ghFRc8AAAAEZRRy8xEB4xghh9kAjQwcJLxlkHACNR4+Fs8JC+lOYGDX4AgsHFV8NBXsCqnRjjdkaLqrqzPUAk6ZHpLAoNovVMQU1FMy4xMDBVVVVV//sQxPwAxQQtT85hhqCOhWu5jbyU2iBUbPAAAAAEmGMkiBn7YCVYxToTwDwWAMtbLR3Mm3COxwM66AoRngAYUjWzRLtegZs3A8fPgpgXMYXBrCI/QA+URk5h+ExBTUUzLjEwMIcQU0v/+xDE+oDEqC1ZzGmE4I0FavmOYITwAAAAUxSOQZFXMJGaGFJAYhBgiarWDgs5aFO2m9kViITOVOYGMZ4A86Pixy4ixzIo3vAJUA4el+lo9CK7+SsBAuQBgnY2TEFNRaqqhQAxW/AAAP/7EMT/AEScLVnMaeSgs4Vn/Y9gTABIYv6wJDFwhAkyPHTMALAQiegaxdhAVFFLEqZ2tXPd05AZPngDdC56XgJKrYCZmbZZpYGAmJCBcLc0KH7ljX38jbvxi3ynMDFr8AAAAC5IKEpq//sQxPuAxKQtW8xpJOCVhap5jmCEXGVKZ4GjSgOvigJZ4jq3VY0ZpgRIotErWKIAAC9AAA4Z6IgGBoCAqSZEBjZqQGEkCwd4lmwig6ZX8gtto/cYfyV4f//1VUxBTUUzLjEwMFVVVVX/+xDE+gDEpCthzGnkoIqFqrmNvJRVVVVVVagQMH3wAAAARSLoprBiYGLmmbobEoMvMgQ6hNU89AUVYESp2GADNoAARAm4kgCGeI9Q5S6A5xzjkLGHkvSpExnVTEFNRTMuMTAwVVVVVf/7EMT6AMSsK1vMbYSgiIWq+Y0wlFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVV//sQxPkAxGwrXcxt5CCKBat5jSScVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xDE+wDEzCtVzHMEII2FqzmNJJxVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EMT8gMTkLVPMceQgl4Wq+Y3ghFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxP+ARLwtV8xtJOCxBWe9n2CEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xDE9oDEcCtRzD2IYHQEpnj3pCxVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EMTWA8AAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV');
      timeA = options.timeA;
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
      }

      if (clock <= 0 && rounds !== 1) {
        audioB.play();
        rounds = --rounds;
        clock = timeA;
        played1 = false;
        played2 = false;
        played3 = false;
      }else if(clock <= 0 && rounds === 1) {
        audioB.play();
        clock = 0;
        rounds = 0;
        clearInterval(interval);
        interval = null;
        render();
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
  options.delay = 10;
  aTimer = new Coutdown(a, options);

  function setTime() {
    resetWatch();
    var t = setCountdown(document.getElementById("hours").value,document.getElementById("minutes").value,document.getElementById("seconds").value);
    var r = document.getElementById("rounds").value
    if (r==="") {
      r = 1;
    }
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
