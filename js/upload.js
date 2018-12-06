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
  FILTER_BUTTON: '.effects__radio',
  FILTER_PREVIEW: '.img-upload__preview',
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

var FILTERS = [
  {
    name: 'none',
    class: 'effects__preview--none',
    getFilter: function () {
      return 'none';
    }
  },
  {
    name: 'chrome',
    class: 'effects__preview--chrome',
    minValue: 0,
    maxValue: 1,
    getFilter: function (percent) {
      return 'grayscale(' + getFilterValue(this.minValue, this.maxValue, percent) + ')';
    }
  },
  {
    name: 'sepia',
    class: 'effects__preview--sepia',
    minValue: 0,
    maxValue: 1,
    getFilter: function (percent) {
      return 'sepia(' + getFilterValue(this.minValue, this.maxValue, percent) + ')';
    }
  },
  {
    name: 'marvin',
    class: 'effects__preview--marvin',
    minValue: 0,
    maxValue: 100,
    getFilter: function (percent) {
      return 'invert(' + getFilterValue(this.minValue, this.maxValue, percent) + '%)';
    }
  },
  {
    name: 'phobos',
    class: 'effects__preview--phobos',
    minValue: 0,
    maxValue: 3,
    getFilter: function (percent) {
      return 'blur(' + getFilterValue(this.minValue, this.maxValue, percent) + 'px)';
    }
  },
  {
    name: 'heat',
    class: 'effects__preview--heat',
    minValue: 1,
    maxValue: 3,
    getFilter: function (percent) {
      return 'brightness(' + getFilterValue(this.minValue, this.maxValue, percent) + ')';
    }
  }
];

var EFFECT_DEFAULT_VALUE = 100;

var HashtagsParameters = {
  MAX_LENGTH: 20,
  MAX_COUNT: 5
};

var Symbols = {
  SPACE: ' ',
  HASH: '#',
  DOT: '.',
  COMMA: ','
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

var effectSlider = editor.querySelector(UploadSelectors.EFFECT_FIELD);
var effectPin = editor.querySelector(UploadSelectors.EFFECT_PIN);
var effectDepth = editor.querySelector(UploadSelectors.EFFECT_DEPTH);
var effectLine = editor.querySelector(UploadSelectors.EFFECT_LINE);
var effectValue = editor.querySelector(UploadSelectors.EFFECT_VALUE);

var filterButtons = editor.querySelectorAll(UploadSelectors.FILTER_BUTTON);

var filterPreview = editor.querySelector(UploadSelectors.FILTER_PREVIEW);
var previewImage = editor.querySelector(UploadSelectors.PREVIEW_IMAGE);

var hashtagsInput = editor.querySelector(UploadSelectors.HASHTAGS_INPUT);
var commentsInput = editor.querySelector(UploadSelectors.COMMENTS_INPUT);

var getFilterValue = function (min, max, percent) {
  return ((max - min) / 100 * percent + min).toString();
};

var scaleValueChange = function (percent) {
  scaleValue.value = percent.toString() + '%';
};

var addFilterButtonClickHandler = function (button, filter) {
  var activateFilter = function () {
    filterPreview.classList.remove(filterPreview.classList[1]);
    filterPreview.classList.add(filter.class);
    effectValue.value = EFFECT_DEFAULT_VALUE;
    changeFilterStyle(effectValue.value);
    effectPin.style.left = EFFECT_DEFAULT_VALUE.toString() + '%';
    effectDepth.style.width = EFFECT_DEFAULT_VALUE.toString() + '%';
    button.checked = true;
  };

  button.addEventListener('click', activateFilter);
};

var resetValue = function () {
  scaleValueChange(ScaleParameters.MAX);
  filterButtons[0].checked = true;
  effectValue.value = EFFECT_DEFAULT_VALUE;
  effectPin.style.left = EFFECT_DEFAULT_VALUE.toString() + '%';
  effectDepth.style.width = EFFECT_DEFAULT_VALUE.toString() + '%';
  filterPreview.style.filter = FILTERS[0].getFilter();
  effectSlider.classList.add(HiddenClassNames.HIDDEN);
  hashtagsInput.value = null;
  commentsInput.value = null;
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
  scaleValueChange(currentPercent);
  previewImage.style.transform = 'scale(' + (currentPercent / 100).toString() + ')';
};

var onScaleSmallerButtonClick = function () {
  var currentPercent = parseInt(scaleValue.value, 10);
  currentPercent = Math.max(ScaleParameters.MIN, currentPercent - ScaleParameters.STEP);
  scaleValueChange(currentPercent);
  previewImage.style.transform = 'scale(' + (currentPercent / 100).toString() + ')';
};

var onEffectPinMousedown = function (evt) {
  evt.preventDefault();

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
    changeFilterStyle(currentPercent);
    effectPin.style.left = currentPercent.toString() + '%';
    effectDepth.style.width = currentPercent.toString() + '%';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    var currentPercent = getEffectLevelPercent(upEvt.clientX);
    effectValue.value = currentPercent;
    changeFilterStyle(currentPercent);
    effectPin.style.left = currentPercent.toString() + '%';
    effectDepth.style.width = currentPercent.toString() + '%';

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

var changeFilterStyle = function (value) {
  for (var i = 0; i < FILTERS.length; i++) {
    if (filterPreview.classList.contains(FILTERS[0].class)) {
      filterPreview.style.filter = FILTERS[0].getFilter(value);
      effectSlider.classList.add(HiddenClassNames.HIDDEN);
    } else if (filterPreview.classList.contains(FILTERS[i].class)) {
      filterPreview.style.filter = FILTERS[i].getFilter(value);
      effectSlider.classList.remove(HiddenClassNames.HIDDEN);
    }
  }
};

var onHashtagsInputValidity = function (evt) {
  var target = evt.target;
  var string = target.value;
  var hashtags = string.split(Symbols.SPACE);

  if (hashtags.length > HashtagsParameters.MAX_COUNT) {
    target.setCustomValidity(AlertStrings.COUNT);
    return;
  }

  for (var i = 0; i < hashtags.length; i++) {
    if (!hashtags[i].startsWith(Symbols.HASH)) {
      target.setCustomValidity(AlertStrings.NO_HASH);
      return;
    }
    if (hashtags[i].length === 1) {
      target.setCustomValidity(AlertStrings.LENGTH_MIN);
      return;
    }
    if (hashtags[i].includes(Symbols.DOT) || hashtags[i].includes(Symbols.COMMA)) {
      target.setCustomValidity(AlertStrings.SPLIT);
      return;
    }
    if (hashtags[i].length > HashtagsParameters.MAX_LENGTH) {
      target.setCustomValidity(AlertStrings.LENGTH_MAX);
      return;
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
  resetValue();

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

for (var i = 0; i < filterButtons.length; i++) {
  addFilterButtonClickHandler(filterButtons[i], FILTERS[i]);
}
