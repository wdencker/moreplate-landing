"use strict";

;

(function () {
  'use strict';

  var pricingSliders = document.querySelectorAll('.pricing-slider');

  if (pricingSliders.length > 0) {
    var _loop = function _loop(i) {
      var pricingSlider = pricingSliders[i];
      var pricingInput = {
        el: pricingSlider.querySelector('input')
      };
      pricingInput.data = JSON.parse(pricingInput.el.getAttribute('data-price-input'));
      pricingInput.currentValEl = pricingSlider.querySelector('.pricing-slider-value');
      pricingInput.thumbSize = parseInt(window.getComputedStyle(pricingInput.currentValEl).getPropertyValue('--thumb-size'), 10);
      var pricingOutputEls = pricingSlider.parentNode.querySelectorAll('.pricing-item-price');
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

      pricingInput.el.setAttribute('min', 0);
      pricingInput.el.setAttribute('max', Object.keys(pricingInput.data).length - 1);
      !pricingInput.el.getAttribute('value') && pricingInput.el.setAttribute('value', 0);
      handlePricingSlider(pricingInput, pricingOutput);
      window.addEventListener('input', function () {
        handlePricingSlider(pricingInput, pricingOutput);
      });
    };

    for (var i = 0; i < pricingSliders.length; i++) {
      _loop(i);
    }
  }

  function handlePricingSlider(input, output) {
    if (input.currentValEl) input.currentValEl.innerHTML = input.data[input.el.value];

    for (var _i2 = 0; _i2 < output.length; _i2++) {
      var outputObj = output[_i2];
      if (outputObj.currency) outputObj.currency.innerHTML = outputObj.data[input.el.value][0];
      if (outputObj.amount) outputObj.amount.innerHTML = outputObj.data[input.el.value][1];
      if (outputObj.after) outputObj.after.innerHTML = outputObj.data[input.el.value][2];
    }

    handleSliderValuePosition(input);
  }

  function handleSliderValuePosition(input) {
    var multiplier = input.el.value / input.el.max;
    var thumbOffset = input.thumbSize * multiplier;
    var priceInputOffset = (input.thumbSize - input.currentValEl.clientWidth) / 2;
    input.currentValEl.style.left = input.el.clientWidth * multiplier - thumbOffset + priceInputOffset + 'px';
  }
})();