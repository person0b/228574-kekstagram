'use strict';

(function () {
  var Selectors = {
    VALUE: '.scale__control--value',
    SMALLER: '.scale__control--smaller',
    BIGGER: '.scale__control--bigger',
    IMAGE: '.img-upload__preview img'
  };

  var Parameters = {
    MIN: 25,
    MAX: 100,
    STEP: 25
  };

  var editor = window.utils.editorModal;
  var value = editor.querySelector(Selectors.VALUE);
  var smallerButton = editor.querySelector(Selectors.SMALLER);
  var biggerButton = editor.querySelector(Selectors.BIGGER);
  var image = editor.querySelector(Selectors.IMAGE);

  var setScale = function (percent) {
    value.value = percent.toString() + '%';
    image.style.transform = 'scale(' + (percent / 100).toString() + ')';
  };

  var onBiggerButtonClick = function () {
    var currentPercent = parseInt(value.value, 10);
    currentPercent = Math.min(Parameters.MAX, currentPercent + Parameters.STEP);
    setScale(currentPercent);
  };

  var onSmallerButtonClick = function () {
    var currentPercent = parseInt(value.value, 10);
    currentPercent = Math.max(Parameters.MIN, currentPercent - Parameters.STEP);
    setScale(currentPercent);
  };

  var reset = function () {
    setScale(Parameters.MAX);
  };

  window.scaleEvents = {
    smallerButton: smallerButton,
    biggerButton: biggerButton,
    onBiggerButtonClick: onBiggerButtonClick,
    onSmallerButtonClick: onSmallerButtonClick,
    setScale: setScale,
    reset: reset
  };
})();
