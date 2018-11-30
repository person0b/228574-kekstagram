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
  FILTER_BUTTON: '.effects__radio',
  FILTER_PREVIEW: '.img-upload__preview',
  PREVIEW_IMAGE: '.img-upload__preview img',
  SCALE_VALUE: '.scale__control--value',
  SCALE_SMALLER: '.scale__control--smaller',
  SCALE_BIGGER: '.scale__control--bigger'
};

var HiddenClassNames = {
  HIDDEN: 'hidden',
  VISUALLY_HIDDEN: 'visually-hidden'
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

var editor = document.querySelector(UploadSelectors.EDITOR);
var uploadButton = document.querySelector(UploadSelectors.FILE_UPLOAD);
var closeEditorButton = editor.querySelector(UploadSelectors.CLOSE);

var scaleValue = editor.querySelector(UploadSelectors.SCALE_VALUE);
var scaleSmallerButton = editor.querySelector(UploadSelectors.SCALE_SMALLER);
var scaleBiggerButton = editor.querySelector(UploadSelectors.SCALE_BIGGER);

var effectField = editor.querySelector(UploadSelectors.EFFECT_FIELD);
var effectPin = editor.querySelector(UploadSelectors.EFFECT_PIN);
var effectLine = editor.querySelector(UploadSelectors.EFFECT_LINE);
var effectValue = editor.querySelector(UploadSelectors.EFFECT_VALUE);

var filterButtons = editor.querySelectorAll(UploadSelectors.FILTER_BUTTON);

var filterPreview = editor.querySelector(UploadSelectors.FILTER_PREVIEW);
var previewImage = editor.querySelector(UploadSelectors.PREVIEW_IMAGE);

var getFilterValue = function (min, max, percent) {
  return ((max - min) / 100 * percent + min).toString();
};

var getEffectLevelPercent = function (pinScreenPosition) {
  var lineRect = effectLine.getBoundingClientRect();
  var lineWidth = lineRect.width;
  var pinPosition = pinScreenPosition - lineRect.left;
  return Math.round((pinPosition / lineWidth) * 100);
};

var scaleValueChange = function (percent) {
  scaleValue.value = percent.toString() + '%';
};

var filterChange = function (button, filter) {
  button.addEventListener('click', function () {
    filterPreview.classList.remove(filterPreview.classList[1]);
    filterPreview.classList.add(filter.class);
    effectValue.value = 100;
    changeFilterStyle(effectValue.value);
  });
};

var changeFilterStyle = function (value) {
  for (var i = 0; i < FILTERS.length; i++) {
    if (filterPreview.classList.contains(FILTERS[0].class)) {
      filterPreview.style.filter = FILTERS[0].getFilter(value);
      effectField.classList.add(HiddenClassNames.HIDDEN);
    } else if (filterPreview.classList.contains(FILTERS[i].class)) {
      filterPreview.style.filter = FILTERS[i].getFilter(value);
      effectField.classList.remove(HiddenClassNames.HIDDEN);
    }
  }
};

var onEditorEscPress = function (evt) {
  if (evt.keyCode === KeyCode.ESC) {
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
  if (currentPercent !== 100) {
    scaleValueChange(currentPercent + 25);
    previewImage.style.transform = 'scale(' + parseInt(scaleValue.value, 10) / 100 + ')';
  }
};

var onScaleSmallerButtonClick = function () {
  var currentPercent = parseInt(scaleValue.value, 10);
  if (currentPercent !== 25) {
    scaleValueChange(currentPercent - 25);
    previewImage.style.transform = 'scale(' + parseInt(scaleValue.value, 10) / 100 + ')';
  }
};

var onEffectPinMouseup = function (evt) {
  effectValue.value = getEffectLevelPercent(evt.screenX);
  changeFilterStyle(effectValue.value);
};

var editorOpen = function () {
  editor.classList.remove(HiddenClassNames.HIDDEN);
  effectField.classList.add(HiddenClassNames.HIDDEN);
  scaleValueChange(100);

  document.addEventListener('keydown', onEditorEscPress);
  closeEditorButton.addEventListener('click', editorClose);
  closeEditorButton.addEventListener('keydown', onCloseEditorButtonEnterPress);
  scaleBiggerButton.addEventListener('click', onScaleBiggerButtonClick);
  scaleSmallerButton.addEventListener('click', onScaleSmallerButtonClick);
  effectPin.addEventListener('mouseup', onEffectPinMouseup);
};

var editorClose = function () {
  editor.classList.add(HiddenClassNames.HIDDEN);
  uploadButton.value = null;

  document.removeEventListener('keydown', onEditorEscPress);
  closeEditorButton.removeEventListener('click', editorClose);
  closeEditorButton.removeEventListener('keydown', onCloseEditorButtonEnterPress);
  scaleBiggerButton.removeEventListener('click', onScaleBiggerButtonClick);
  scaleSmallerButton.removeEventListener('click', onScaleSmallerButtonClick);
  effectPin.removeEventListener('mouseup', onEffectPinMouseup);
};

uploadButton.addEventListener('change', function () {
  editorOpen();
});

for (var i = 0; i < filterButtons.length; i++) {
  filterChange(filterButtons[i], FILTERS[i]);
}
