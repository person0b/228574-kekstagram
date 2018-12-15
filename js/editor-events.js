'use strict';

(function () {
  var Selector = {
    UPLOAD_BUTTON: '#upload-file',
    CLOSE: '.img-upload__cancel',
    HASHTAGS_INPUT: '.text__hashtags',
    COMMENTS_INPUT: '.text__description'
  };

  var editor = window.utils.editorModal;
  var uploadButton = document.querySelector(Selector.UPLOAD_BUTTON);
  var closeButton = editor.querySelector(Selector.CLOSE);

  var scaleSmallerButton = window.scaleEvents.smallerButton;
  var scaleBiggerButton = window.scaleEvents.biggerButton;

  var effectButtons = window.effectEvents.buttons;
  var effectPin = window.effectEvents.pin;

  var hashtagsInput = editor.querySelector(Selector.HASHTAGS_INPUT);
  var commentsInput = editor.querySelector(Selector.COMMENTS_INPUT);


  var onEditorEscPress = function (evt) {
    if (evt.keyCode === window.utils.keyCode.ESC && document.activeElement !== hashtagsInput && document.activeElement !== commentsInput) {
      close();
    }
  };

  var onCloseButtonEnterPress = function (evt) {
    if (evt.keyCode === window.utils.keyCode.ENTER) {
      close();
    }
  };

  var resetValue = function () {
    window.scaleEvents.reset();
    window.effectEvents.reset();
    hashtagsInput.value = null;
    commentsInput.value = null;
  };

  var open = function () {
    resetValue();

    editor.classList.remove(window.utils.className.HIDDEN);

    document.addEventListener('keydown', onEditorEscPress);
    closeButton.addEventListener('click', close);
    closeButton.addEventListener('keydown', onCloseButtonEnterPress);
    scaleBiggerButton.addEventListener('click', window.scaleEvents.onBiggerButtonClick);
    scaleSmallerButton.addEventListener('click', window.scaleEvents.onSmallerButtonClick);
    effectPin.addEventListener('mousedown', window.effectEvents.onPinMousedown);
    for (var i = 0; i < effectButtons.length; i++) {
      window.effectEvents.addButtonClickHandler(effectButtons[i]);
    }
    hashtagsInput.addEventListener('input', window.hashtagsValidity);
  };

  var close = function () {
    editor.classList.add(window.utils.className.HIDDEN);
    uploadButton.value = null;

    document.removeEventListener('keydown', onEditorEscPress);
    closeButton.removeEventListener('click', close);
    closeButton.removeEventListener('keydown', onCloseButtonEnterPress);
    scaleBiggerButton.removeEventListener('click', window.scaleEvents.onBiggerButtonClick);
    scaleSmallerButton.removeEventListener('click', window.scaleEvents.onSmallerButtonClick);
    effectPin.removeEventListener('mousedown', window.effectEvents.onPinMousedown);
    hashtagsInput.removeEventListener('input', window.hashtagsValidity);
  };

  uploadButton.addEventListener('change', open);

  window.editorEvents = {
    close: close
  };
})();
