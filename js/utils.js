'use strict';

(function () {
  var KeyCode = {
    ESC: 27,
    ENTER: 13
  };
  var ClassName = {
    HIDDEN: 'hidden',
    VISUALLY_HIDDEN: 'visually-hidden',
    MODAL_OPEN: 'modal-open'
  };
  var ModalSelector = {
    PICTURE: '.big-picture',
    EDITOR: '.img-upload__overlay'
  };
  var DEBOUNCE_INTERVAL = 500;

  var getRandomInt = function (min, max) {
    if (max === undefined) {
      max = min;
      min = 0;
    }
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomElement = function (list) {
    return list[getRandomInt(list.length)];
  };

  var removeChildren = function (element) {
    while (element.lastChild) {
      element.removeChild(element.lastChild);
    }
  };

  var debounce = function (cb) {
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
  };


  window.utils = {
    keyCode: KeyCode,
    className: ClassName,
    pictureModal: document.querySelector(ModalSelector.PICTURE),
    editorModal: document.querySelector(ModalSelector.EDITOR),
    getRandomInt: getRandomInt,
    getRandomElement: getRandomElement,
    removeChildren: removeChildren,
    debounce: debounce
  };
})();
