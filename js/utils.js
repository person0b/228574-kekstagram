'use strict';

(function () {
  var ModalSelector = {
    PICTURE: '.big-picture',
    EDITOR: '.img-upload__overlay'
  };
  var DEBOUNCE_INTERVAL = 500;

  window.utils = {
    ClassName: {
      HIDDEN: 'hidden',
      VISUALLY_HIDDEN: 'visually-hidden',
      MODAL_OPEN: 'modal-open'
    },
    PICTURE_MODAL: document.querySelector(ModalSelector.PICTURE),
    EDITOR_MODAL: document.querySelector(ModalSelector.EDITOR),

    getRandomInt: function (min, max) {
      if (max === undefined) {
        max = min;
        min = 0;
      }
      return Math.floor(Math.random() * (max - min)) + min;
    },

    getRandomElement: function (list) {
      return list[window.utils.getRandomInt(list.length)];
    },

    removeChildren: function (element) {
      while (element.lastChild) {
        element.removeChild(element.lastChild);
      }
    },

    debounce: function (cb) {
      var lastTimeout = null;

      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb.apply(null, parameters);
        }, DEBOUNCE_INTERVAL);
      };
    },

    mixArray: function (arr) {
      for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
      return arr;
    }
  };
})();
