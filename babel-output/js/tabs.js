"use strict";

;

(function () {
  'use strict';

  var tabs = document.getElementsByClassName('tab');

  function handleTabs(tab) {
    var id = tab.getAttribute('aria-controls');
    document.getElementById(id).classList.add('is-active');
    tab.classList.add('is-active');
  }

  if (tabs.length > 0) {
    for (var i = 0; i < tabs.length; i++) {
      var tab = tabs[i];
      tab.addEventListener('click', function (e) {
        e.preventDefault();
        var tabsContainer = this.closest('.tabs');
        var tabPanels = tabsContainer.getElementsByClassName('tab-panel'); // Do nothing if item is active

        if (this.classList.contains('is-active')) {
          return;
        } // Remove active classes


        for (var _i = 0; _i < tabs.length; _i++) {
          tabs[_i].classList.remove('is-active');
        }

        for (var _i2 = 0; _i2 < tabPanels.length; _i2++) {
          tabPanels[_i2].classList.remove('is-active');
        }

        handleTabs(this);
      });

      if (tab.classList.contains('is-active')) {
        handleTabs(tab);
      }
    }
  }
})();