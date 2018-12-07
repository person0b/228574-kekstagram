'use strict';

var KeyCode = {
  ESC: 27,
  ENTER: 13
};

var UploadSelectors = {
  FILE_UPLOAD: '#upload-file',
  EDITOR: '.img-upload__overlay',
  CLOSE: '.img-upload__cancel',
  EFFECT_FIELD: '.effect-level',
  EFFECT_VALUE: '.effect-level__value',
  EFFECT_LINE: '.effect-level__line',
  EFFECT_PIN: '.effect-level__pin',
  EFFECT_DEPTH: '.effect-level__depth',
  EFFECT_BUTTON: '.effects__radio',
  CURRENT_EFFECT: '[name="effect"]:checked',
  PREVIEW: '.img-upload__preview',
  PREVIEW_IMAGE: '.img-upload__preview img',
  SCALE_VALUE: '.scale__control--value',
  SCALE_SMALLER: '.scale__control--smaller',
  SCALE_BIGGER: '.scale__control--bigger',
  HASHTAGS_INPUT: '.text__hashtags',
  COMMENTS_INPUT: '.text__description'
};

var HiddenClassNames = {
  HIDDEN: 'hidden',
  VISUALLY_HIDDEN: 'visually-hidden'
};

var ScaleParameters = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

var EFFECTS = {
  none: {
    class: 'effects__preview--none',
    range: false,
    getFilter: function () {
      return 'none';
    }
  },
  chrome: {
    class: 'effects__preview--chrome',
    range: true,
    minValue: 0,
    maxValue: 1,
    getFilter: function (percent) {
      return 'grayscale(' + getFilterValue(this.minValue, this.maxValue, percent) + ')';
    }
  },
  sepia: {
    class: 'effects__preview--sepia',
    range: true,
    minValue: 0,
    maxValue: 1,
    getFilter: function (percent) {
      return 'sepia(' + getFilterValue(this.minValue, this.maxValue, percent) + ')';
    }
  },
  marvin: {
    class: 'effects__preview--marvin',
    range: true,
    minValue: 0,
    maxValue: 100,
    getFilter: function (percent) {
      return 'invert(' + getFilterValue(this.minValue, this.maxValue, percent) + '%)';
    }
  },
  phobos: {
    class: 'effects__preview--phobos',
    range: true,
    minValue: 0,
    maxValue: 3,
    getFilter: function (percent) {
      return 'blur(' + getFilterValue(this.minValue, this.maxValue, percent) + 'px)';
    }
  },
  heat: {
    class: 'effects__preview--heat',
    range: true,
    minValue: 1,
    maxValue: 3,
    getFilter: function (percent) {
      return 'brightness(' + getFilterValue(this.minValue, this.maxValue, percent) + ')';
    }
  }
};

var EFFECT_DEFAULT_VALUE = 100;

var HashtagsParameters = {
  MAX_LENGTH: 20,
  MAX_COUNT: 5
};

var HashtagsSpecial = {
  SEPARATOR: ' ',
  START_SYMBOL: '#',
  BANNED_SYMBOLS: ['.', ',']
};

var AlertStrings = {
  NO_HASH: 'Хэш-тег должен начинаться с символа # (решётка)',
  LENGTH_MAX: 'Максимальная длина одного хэш-тега ' + HashtagsParameters.MAX_LENGTH.toString() + ' символов, включая решётку;',
  LENGTH_MIN: 'Хеш-тег не может состоять только из одной решётки',
  SPLIT: 'Хэш-теги должны разделяться пробелами',
  COUNT: 'Нельзя указать больше пяти хэш-тегов',
  DUPLICATE: 'Один и тот же хэш-тег не может быть использован дважды, теги нечувствительны к регистру'
};

var editor = document.querySelector(UploadSelectors.EDITOR);
var uploadButton = document.querySelector(UploadSelectors.FILE_UPLOAD);
var closeEditorButton = editor.querySelector(UploadSelectors.CLOSE);

var scaleValue = editor.querySelector(UploadSelectors.SCALE_VALUE);
var scaleSmallerButton = editor.querySelector(UploadSelectors.SCALE_SMALLER);
var scaleBiggerButton = editor.querySelector(UploadSelectors.SCALE_BIGGER);

var effectButtons = editor.querySelectorAll(UploadSelectors.EFFECT_BUTTON);
var effectSlider = editor.querySelector(UploadSelectors.EFFECT_FIELD);
var effectPin = editor.querySelector(UploadSelectors.EFFECT_PIN);
var effectDepth = editor.querySelector(UploadSelectors.EFFECT_DEPTH);
var effectLine = editor.querySelector(UploadSelectors.EFFECT_LINE);
var effectValue = editor.querySelector(UploadSelectors.EFFECT_VALUE);

var preview = editor.querySelector(UploadSelectors.PREVIEW);
var previewImage = editor.querySelector(UploadSelectors.PREVIEW_IMAGE);

var hashtagsInput = editor.querySelector(UploadSelectors.HASHTAGS_INPUT);
var commentsInput = editor.querySelector(UploadSelectors.COMMENTS_INPUT);

var addEffectButtonClickHandler = function (button) {
  var effect = button.value;

  var activateEffect = function () {
    preview.classList.remove(preview.classList[1]);
    preview.classList.add(EFFECTS[effect].class);
    button.checked = true;
    setEffectLevel(effect, EFFECT_DEFAULT_VALUE);
    if (EFFECTS[effect].range) {
      effectSlider.classList.remove(HiddenClassNames.HIDDEN);
    } else {
      effectSlider.classList.add(HiddenClassNames.HIDDEN);
    }
  };

  button.addEventListener('click', activateEffect);
};

var onEditorEscPress = function (evt) {
  if (evt.keyCode === KeyCode.ESC && document.activeElement !== hashtagsInput && document.activeElement !== commentsInput) {
    editorClose();
  }
};

var onCloseEditorButtonEnterPress = function (evt) {
  if (evt.keyCode === KeyCode.ENTER) {
    editorClose();
  }
};

var onScaleBiggerButtonClick = function () {
  var currentPercent = parseInt(scaleValue.value, 10);
  currentPercent = Math.min(ScaleParameters.MAX, currentPercent + ScaleParameters.STEP);
  setScale(currentPercent);
};

var onScaleSmallerButtonClick = function () {
  var currentPercent = parseInt(scaleValue.value, 10);
  currentPercent = Math.max(ScaleParameters.MIN, currentPercent - ScaleParameters.STEP);
  setScale(currentPercent);
};

var onEffectPinMousedown = function (evt) {
  evt.preventDefault();

  var effect = editor.querySelector(UploadSelectors.CURRENT_EFFECT).value;

  var getEffectLevelPercent = function (pinScreenPosition) {
    var lineRect = effectLine.getBoundingClientRect();
    var lineWidth = lineRect.width;
    var pinPosition = pinScreenPosition - lineRect.left;
    var percent = Math.round((pinPosition / lineWidth) * 100);
    return Math.min(Math.max(percent, 0), 100);
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var currentPercent = getEffectLevelPercent(moveEvt.clientX);
    setEffectLevel(effect, currentPercent);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    var currentPercent = getEffectLevelPercent(upEvt.clientX);
    setEffectLevel(effect, currentPercent);

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

var onHashtagsInputValidity = function (evt) {
  var target = evt.target;
  var string = target.value;
  var hashtags = string.split(HashtagsSpecial.SEPARATOR);

  if (hashtags.length > HashtagsParameters.MAX_COUNT) {
    target.setCustomValidity(AlertStrings.COUNT);
    return;
  }

  for (var i = 0; i < hashtags.length; i++) {
    if (!hashtags[i].startsWith(HashtagsSpecial.START_SYMBOL)) {
      target.setCustomValidity(AlertStrings.NO_HASH);
      return;
    }
    if (hashtags[i].length === 1) {
      target.setCustomValidity(AlertStrings.LENGTH_MIN);
      return;
    }
    if (hashtags[i].length > HashtagsParameters.MAX_LENGTH) {
      target.setCustomValidity(AlertStrings.LENGTH_MAX);
      return;
    }

    for (var s = 0; s < HashtagsSpecial.BANNED_SYMBOLS.length; s++) {
      if (hashtags[i].includes(HashtagsSpecial.BANNED_SYMBOLS[s])) {
        target.setCustomValidity(AlertStrings.SPLIT);
        return;
      }
    }

    for (var j = i + 1; j < hashtags.length; j++) {
      if (hashtags[i].toLowerCase() === hashtags[j].toLowerCase()) {
        target.setCustomValidity(AlertStrings.DUPLICATE);
        return;
      }
    }
  }

  target.setCustomValidity('');
  return;
};

var getFilterValue = function (min, max, percent) {
  return ((max - min) / 100 * percent + min).toString();
};

var setScale = function (percent) {
  scaleValue.value = percent.toString() + '%';
  previewImage.style.transform = 'scale(' + (percent / 100).toString() + ')';
};

var resetValue = function () {
  setScale(ScaleParameters.MAX);
  effectButtons[0].checked = true;
  setEffectLevel(effectButtons[0].value, EFFECT_DEFAULT_VALUE);
  effectSlider.classList.add(HiddenClassNames.HIDDEN);
  hashtagsInput.value = null;
  commentsInput.value = null;
};

var setEffectLevel = function (effect, level) {
  effectValue.value = level;
  preview.style.filter = EFFECTS[effect].getFilter(level);
  effectPin.style.left = level.toString() + '%';
  effectDepth.style.width = level.toString() + '%';
};

var editorOpen = function () {
  resetValue();

  editor.classList.remove(HiddenClassNames.HIDDEN);

  document.addEventListener('keydown', onEditorEscPress);
  closeEditorButton.addEventListener('click', editorClose);
  closeEditorButton.addEventListener('keydown', onCloseEditorButtonEnterPress);
  scaleBiggerButton.addEventListener('click', onScaleBiggerButtonClick);
  scaleSmallerButton.addEventListener('click', onScaleSmallerButtonClick);
  effectPin.addEventListener('mousedown', onEffectPinMousedown);
  hashtagsInput.addEventListener('input', onHashtagsInputValidity);
};

var editorClose = function () {
  editor.classList.add(HiddenClassNames.HIDDEN);
  uploadButton.value = null;

  document.removeEventListener('keydown', onEditorEscPress);
  closeEditorButton.removeEventListener('click', editorClose);
  closeEditorButton.removeEventListener('keydown', onCloseEditorButtonEnterPress);
  scaleBiggerButton.removeEventListener('click', onScaleBiggerButtonClick);
  scaleSmallerButton.removeEventListener('click', onScaleSmallerButtonClick);
  effectPin.removeEventListener('mousedown', onEffectPinMousedown);
  hashtagsInput.removeEventListener('input', onHashtagsInputValidity);
};

uploadButton.addEventListener('change', editorOpen);

for (var i = 0; i < effectButtons.length; i++) {
  addEffectButtonClickHandler(effectButtons[i]);
}
