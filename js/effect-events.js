'use strict';

(function () {
  var Selector = {
    FIELD: '.effect-level',
    LEVEL_INPUT: '.effect-level__value',
    LINE: '.effect-level__line',
    PIN: '.effect-level__pin',
    DEPTH: '.effect-level__depth',
    BUTTON: '.effects__radio',
    CURRENT: '[name="effect"]:checked',
    IMAGE: '.img-upload__preview'
  };
  var EFFECTS = {
    none: {
      class: 'effects__preview--none',
      showRange: false,
      getFilter: function () {
        return 'none';
      }
    },
    chrome: {
      class: 'effects__preview--chrome',
      showRange: true,
      minValue: 0,
      maxValue: 1,
      getFilter: function (percent) {
        return 'grayscale(' + getValue(this.minValue, this.maxValue, percent) + ')';
      }
    },
    sepia: {
      class: 'effects__preview--sepia',
      showRange: true,
      minValue: 0,
      maxValue: 1,
      getFilter: function (percent) {
        return 'sepia(' + getValue(this.minValue, this.maxValue, percent) + ')';
      }
    },
    marvin: {
      class: 'effects__preview--marvin',
      showRange: true,
      minValue: 0,
      maxValue: 100,
      getFilter: function (percent) {
        return 'invert(' + getValue(this.minValue, this.maxValue, percent) + '%)';
      }
    },
    phobos: {
      class: 'effects__preview--phobos',
      showRange: true,
      minValue: 0,
      maxValue: 3,
      getFilter: function (percent) {
        return 'blur(' + getValue(this.minValue, this.maxValue, percent) + 'px)';
      }
    },
    heat: {
      class: 'effects__preview--heat',
      showRange: true,
      minValue: 1,
      maxValue: 3,
      getFilter: function (percent) {
        return 'brightness(' + getValue(this.minValue, this.maxValue, percent) + ')';
      }
    }
  };
  var DEFAULT_LEVEL = 100;

  var editor = window.utils.editorModal;
  var buttons = editor.querySelectorAll(Selector.BUTTON);
  var slider = editor.querySelector(Selector.FIELD);
  var pin = editor.querySelector(Selector.PIN);
  var depth = editor.querySelector(Selector.DEPTH);
  var line = editor.querySelector(Selector.LINE);
  var inputLevel = editor.querySelector(Selector.LEVEL_INPUT);
  var image = editor.querySelector(Selector.IMAGE);

  var getValue = function (min, max, percent) {
    return ((max - min) / 100 * percent + min).toString();
  };

  var setLevel = function (effect, level) {
    inputLevel.setAttribute('value', level);
    image.style.filter = EFFECTS[effect].getFilter(level);
    pin.style.left = level.toString() + '%';
    depth.style.width = level.toString() + '%';
  };

  var activateEffect = function (button) {
    var effect = button.value;

    var onEffectButtonClick = function () {
      for (var effectObj in EFFECTS) {
        if (image.classList.contains(EFFECTS[effectObj].class)) {
          image.classList.remove(EFFECTS[effectObj].class);
        }
      }
      image.classList.add(EFFECTS[effect].class);
      button.checked = true;
      setLevel(effect, DEFAULT_LEVEL);
      if (EFFECTS[effect].showRange) {
        slider.classList.remove(window.utils.className.HIDDEN);
      } else {
        slider.classList.add(window.utils.className.HIDDEN);
      }
    };

    button.addEventListener('click', onEffectButtonClick);
  };

  var onPinMousedown = function (evt) {
    evt.preventDefault();

    var effect = editor.querySelector(Selector.CURRENT).value;

    var getEffectLevelPercent = function (pinScreenPosition) {
      var lineRect = line.getBoundingClientRect();
      var lineWidth = lineRect.width;
      var pinPosition = pinScreenPosition - lineRect.left;
      var percent = Math.round((pinPosition / lineWidth) * 100);
      return Math.min(Math.max(percent, 0), 100);
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var currentPercent = getEffectLevelPercent(moveEvt.clientX);
      setLevel(effect, currentPercent);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      var currentPercent = getEffectLevelPercent(upEvt.clientX);
      setLevel(effect, currentPercent);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var reset = function () {
    buttons[0].checked = true;
    setLevel(buttons[0].value, DEFAULT_LEVEL);
    slider.classList.add(window.utils.className.HIDDEN);
  };

  window.effectEvents = {
    buttons: buttons,
    pin: pin,
    activateEffect: activateEffect,
    onPinMousedown: onPinMousedown,
    reset: reset
  };
})();
