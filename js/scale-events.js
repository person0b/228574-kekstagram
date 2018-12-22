'use strict';

(function () {
  var Selector = {
    INPUT: '.scale__control--value',
    SMALLER: '.scale__control--smaller',
    BIGGER: '.scale__control--bigger',
    IMAGE: '.img-upload__preview img'
  };

  var Parameter = {
    MIN: 25,
    MAX: 100,
    STEP: 25
  };

  var editor = window.utils.EDITOR_MODAL;
  var inputScale = editor.querySelector(Selector.INPUT);
  var image = editor.querySelector(Selector.IMAGE);

  var setScale = function (percent) {
    inputScale.setAttribute('value', percent.toString() + '%');
    image.style.transform = 'scale(' + (percent / 100).toString() + ')';
  };

  window.scaleEvents = {
    smallerButton: editor.querySelector(Selector.SMALLER),
    biggerButton: editor.querySelector(Selector.BIGGER),

    onBiggerButtonClick: function () {
      var currentPercent = parseInt(inputScale.value, 10);
      currentPercent = Math.min(Parameter.MAX, currentPercent + Parameter.STEP);
      setScale(currentPercent);
    },

    onSmallerButtonClick: function () {
      var currentPercent = parseInt(inputScale.value, 10);
      currentPercent = Math.max(Parameter.MIN, currentPercent - Parameter.STEP);
      setScale(currentPercent);
    },

    reset: function () {
      setScale(Parameter.MAX);
    }
  };
})();
