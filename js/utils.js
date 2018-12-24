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
      return arr.sort(function () {
        return 0.5 - Math.random();
      });
    }
  };
})();
