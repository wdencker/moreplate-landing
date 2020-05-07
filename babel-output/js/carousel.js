"use strict";

;

(function () {
  'use strict'; // Swipe detector
  // https://gist.github.com/chrishaensel/e17c9f3838f246d75fe3bd19d6bb92e8#file-swipe-js

  var _swipe = {
    touchStartX: 0,
    touchEndX: 0,
    minSwipePixels: 30,
    detectionZone: undefined,
    swipeCallback: function swipeCallback() {},
    init: function init(detectionZone, callback) {
      _swipe.swipeCallback = callback;
      detectionZone.addEventListener('touchstart', function (event) {
        _swipe.touchStartX = event.changedTouches[0].screenX;
      }, false);
      detectionZone.addEventListener('touchend', function (event) {
        _swipe.touchEndX = event.changedTouches[0].screenX;

        _swipe.handleSwipeGesture();
      }, false);
    },
    handleSwipeGesture: function handleSwipeGesture() {
      var direction, moved;

      if (_swipe.touchEndX <= _swipe.touchStartX) {
        moved = _swipe.touchStartX - _swipe.touchEndX;
        direction = 'left';
      }

      if (_swipe.touchEndX >= _swipe.touchStartX) {
        moved = _swipe.touchEndX - _swipe.touchStartX;
        direction = 'right';
      }

      if (moved > _swipe.minSwipePixels && direction !== 'undefined') {
        _swipe.swipe(direction, moved);
      }
    },
    swipe: function swipe(direction, movedPixels) {
      var ret = {};
      ret.direction = direction;
      ret.movedPixels = movedPixels;

      _swipe.swipeCallback(ret);
    }
  };
  var carousels = document.getElementsByClassName('carousel-items'); // Rotate the carousel forward or backward

  function rotateCarousel(el, dir) {
    if (dir === undefined) {
      dir = 'next';
    }

    var currentItem = el.getElementsByClassName('carousel-item is-active')[0];
    var nextItem = dir === 'next' ? currentItem.nextElementSibling : currentItem.previousElementSibling;
    var index = currentItem.getAttribute('data-carousel');
    var currentBullet = el.parentNode.getElementsByClassName('carousel-bullet')[index];
    var nextBullet = dir === 'next' ? currentBullet.nextElementSibling : currentBullet.previousElementSibling;
    currentItem.classList.remove('is-active');
    currentBullet.classList.remove('is-active');

    if (nextItem) {
      nextItem.classList.add('is-active');
      nextBullet.classList.add('is-active');
    } else {
      if (dir === 'next') {
        el.firstElementChild.classList.add('is-active');
        el.parentNode.getElementsByClassName('carousel-bullets')[0].firstElementChild.classList.add('is-active');
      } else {
        el.lastElementChild.classList.add('is-active');
        el.parentNode.getElementsByClassName('carousel-bullets')[0].lastElementChild.classList.add('is-active');
      }
    }
  } // Equal heights fix


  function equalHeightCarousel(carousel, items) {
    var taller = 0;
    var height;

    for (var i = 0; i < items.length; i++) {
      items[0].parentNode.style.minHeight = taller + 'px';
      items[i].classList.add('is-loading');
      height = items[i].offsetHeight;
      items[i].classList.remove('is-loading');

      if (height > taller) {
        taller = height;
      }
    }

    items[0].parentNode.style.minHeight = taller + 'px';
  } // Clear autorotate


  function clearAutorotate(autorotate) {
    if (autorotate) {
      clearInterval(autorotate);
    }
  }

  if (carousels.length > 0) {
    var _loop = function _loop(i) {
      var carousel = carousels[i];
      var items = carousel.getElementsByClassName('carousel-item');
      var activeItem = 0;
      var autorotateTiming = carousel.getAttribute('data-autorotate'); // Generate bullets container

      var bulletsContainer = document.createElement('div');
      bulletsContainer.className = 'carousel-bullets';
      carousel.parentNode.insertBefore(bulletsContainer, carousel.nextSibling);

      for (var _i = 0; _i < items.length; _i++) {
        // Add data attributes
        items[_i].setAttribute('data-carousel', _i); // Determine a new active item, if any


        if (items[_i].classList.contains('is-active')) activeItem = _i; // Generate bullets

        var bullet = document.createElement('button');
        bullet.className = 'carousel-bullet';
        bullet.setAttribute('data-bullet', _i);
        carousel.parentNode.getElementsByClassName('carousel-bullets')[0].appendChild(bullet);
      } // Add is-active class to first carousel item and bullet


      items[activeItem].classList.add('is-active');
      var bullets = carousel.parentNode.getElementsByClassName('carousel-bullet');
      bullets[activeItem].classList.add('is-active'); // Equal height items

      equalHeightCarousel(carousel, items);
      window.addEventListener('resize', function () {
        equalHeightCarousel(carousel, items);
      }); // Autorotate

      var autorotate = false;

      if (autorotateTiming) {
        autorotate = setInterval(function () {
          rotateCarousel(carousel, 'next');
        }, autorotateTiming);
      } // Rotate by bullet click


      var _loop2 = function _loop2(_i2) {
        var bullet = bullets[_i2];
        bullet.addEventListener('click', function (e) {
          e.preventDefault(); // Do nothing if item is active

          if (bullet.classList.contains('is-active')) {
            return;
          } // Remove active classes


          for (var _i3 = 0; _i3 < bullets.length; _i3++) {
            bullets[_i3].classList.remove('is-active');
          }

          for (var _i4 = 0; _i4 < items.length; _i4++) {
            items[_i4].classList.remove('is-active');
          } // Add active classes to corresponding items and bullets


          var index = this.getAttribute('data-bullet');
          items[index].classList.add('is-active');
          this.classList.add('is-active'); // Clear autorotate timing

          clearAutorotate(autorotate);
        });
      };

      for (var _i2 = 0; _i2 < bullets.length; _i2++) {
        _loop2(_i2);
      } // Rotate on swipe


      _swipe.init(carousel, function (e) {
        if (e.direction === 'left') {
          rotateCarousel(carousel, 'next');
        } else if (e.direction === 'right') {
          rotateCarousel(carousel, 'prev');
        } // Clear autorotate timing


        clearAutorotate(autorotate);
      });
    };

    for (var i = 0; i < carousels.length; i++) {
      _loop(i);
    }
  }
})();