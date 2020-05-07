"use strict";

;

(function () {
  'use strict';

  var accordionEl = document.getElementsByClassName('accordion-header');

  function openAccordion(parent, panel) {
    parent.classList.add('is-active');
    panel.style.maxHeight = panel.scrollHeight + 'px';
  }

  function closeAccordion(parent, panel) {
    parent.classList.remove('is-active');
    panel.style.maxHeight = null;
  }

  if (accordionEl.length > 0) {
    var _loop = function _loop(i) {
      var el = accordionEl[i];
      var parent = el.parentNode;
      var panel = el.nextElementSibling;
      parent.classList.contains('is-active') && openAccordion(parent, panel);
      el.addEventListener('click', function () {
        parent.classList.contains('is-active') ? closeAccordion(parent, panel) : openAccordion(parent, panel);
      });
    };

    for (var i = 0; i < accordionEl.length; i++) {
      _loop(i);
    }
  }
})();