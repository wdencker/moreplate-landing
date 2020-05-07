"use strict";

;

(function () {
  'use strict';

  var pricingSwitchers = document.querySelectorAll('.pricing-switcher');

  if (pricingSwitchers.length > 0) {
    var _loop = function _loop(i) {
      var pricingSwitcher = pricingSwitchers[i];
      var pricingInputEl = pricingSwitcher.querySelector('input');
      var pricingOutputEls = pricingSwitcher.parentNode.querySelectorAll('.pricing-item-price');
      var pricingOutput = [];

      for (var _i = 0; _i < pricingOutputEls.length; _i++) {
        var pricingOutputEl = pricingOutputEls[_i];
        var pricingOutputObj = {};
        pricingOutputObj.currency = pricingOutputEl.parentNode.querySelector('.pricing-item-price-currency');
        pricingOutputObj.amount = pricingOutputEl.parentNode.querySelector('.pricing-item-price-amount');
        pricingOutputObj.after = pricingOutputEl.parentNode.querySelector('.pricing-item-price-after');
        pricingOutputObj.data = JSON.parse(pricingOutputEl.getAttribute('data-price-output'));
        pricingOutput.push(pricingOutputObj);
      }

      handlePricingSwitch(pricingInputEl, pricingOutput);
      window.addEventListener('change', function () {
        handlePricingSwitch(pricingInputEl, pricingOutput);
      });
    };

    for (var i = 0; i < pricingSwitchers.length; i++) {
      _loop(i);
    }
  }

  function handlePricingSwitch(inputEl, output) {
    for (var _i2 = 0; _i2 < output.length; _i2++) {
      var outputObj = output[_i2];
      var inputElValue = inputEl.checked ? 1 : 0;
      if (outputObj.currency) outputObj.currency.innerHTML = outputObj.data[inputElValue][0];
      if (outputObj.amount) outputObj.amount.innerHTML = outputObj.data[inputElValue][1];
      if (outputObj.after) outputObj.after.innerHTML = outputObj.data[inputElValue][2];
    }
  }
})();