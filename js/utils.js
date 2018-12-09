'use strict';

(function () {
  var KeyCodes = {
    ESC: 27,
    ENTER: 13
  };
  var ClassNames = {
    HIDDEN: 'hidden',
    VISUALLY_HIDDEN: 'visually-hidden',
    MODAL_OPEN: 'modal-open'
  };
  var ModalSelectors = {
    PICTURE: '.big-picture',
    EDITOR: '.img-upload__overlay'
  };

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

  window.utils = {
    keyCodes: KeyCodes,
    classNames: ClassNames,
    pictureModal: document.querySelector(ModalSelectors.PICTURE),
    editorModal: document.querySelector(ModalSelectors.EDITOR),
    getRandomInt: getRandomInt,
    getRandomElement: getRandomElement,
    removeChildren: removeChildren
  };
})();
