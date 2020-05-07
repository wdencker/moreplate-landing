"use strict";

;

(function () {
  'use strict';

  var smoothScrollLinks = document.getElementsByClassName('smooth-scroll');

  var easeInOutQuad = function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  var scrollToEl = function scrollToEl(startTime, currentTime, duration, scrollEndElemTop, startScrollOffset) {
    var runtime = currentTime - startTime;
    var progress = runtime / duration;
    progress = Math.min(progress, 1);
    var ease = easeInOutQuad(progress);
    window.scroll(0, startScrollOffset + scrollEndElemTop * ease);

    if (runtime < duration) {
      window.requestAnimationFrame(function (timestamp) {
        var currentTime = timestamp || new Date().getTime();
        scrollToEl(startTime, currentTime, duration, scrollEndElemTop, startScrollOffset);
      });
    }
  };

  if (smoothScrollLinks.length > 0) {
    for (var i = 0; i < smoothScrollLinks.length; i++) {
      var smoothScrollLink = smoothScrollLinks[i];
      smoothScrollLink.addEventListener('click', function (e) {
        e.preventDefault();
        var link = e.target.closest('.smooth-scroll');
        var targetId = link.href.split('#')[1];
        var target = document.getElementById(targetId);
        var duration = link.getAttribute('data-duration') || 1000;
        if (!target) return;
        window.requestAnimationFrame(function (timestamp) {
          var stamp = timestamp || new Date().getTime();
          var start = stamp;
          var startScrollOffset = window.pageYOffset;
          var scrollEndElemTop = target.getBoundingClientRect().top;
          scrollToEl(start, stamp, duration, scrollEndElemTop, startScrollOffset);
        });
      });
    }
  }
})();