'use strict';

(function () {
  var Selector = {
    UPLOAD_BUTTON: '#upload-file',
    CLOSE_BUTTON: '.img-upload__cancel',
    HASHTAGS_INPUT: '.text__hashtags',
    COMMENTS_INPUT: '.text__description'
  };

  var editor = window.utils.EDITOR_MODAL;
  var uploadButton = document.querySelector(Selector.UPLOAD_BUTTON);
  var closeButton = editor.querySelector(Selector.CLOSE_BUTTON);

  var scaleSmallerButton = window.scaleEvents.smallerButton;
  var scaleBiggerButton = window.scaleEvents.biggerButton;

  var effectButtons = window.effectEvents.buttons;
  var effectPin = window.effectEvents.pin;

  var hashtagsInput = editor.querySelector(Selector.HASHTAGS_INPUT);
  var commentsInput = editor.querySelector(Selector.COMMENTS_INPUT);


  var onEditorEscPress = function () {
    if (window.keyboard.isEscPressed && document.activeElement !== hashtagsInput && document.activeElement !== commentsInput) {
      closeEditor();
    }
  };

  var onCloseButtonEnterPress = function () {
    if (window.keyboard.isEnterPressed) {
      closeEditor();
    }
  };

  var resetValue = function () {
    window.scaleEvents.reset();
    window.effectEvents.reset();
    hashtagsInput.value = null;
    commentsInput.value = null;
    window.loadedPreview.reset();
  };

  var openEditor = function () {
    resetValue();

    window.loadedPreview.showPreview(uploadButton);
    editor.classList.remove(window.utils.ClassName.HIDDEN);

    document.addEventListener('keydown', onEditorEscPress);
    closeButton.addEventListener('click', closeEditor);
    closeButton.addEventListener('keydown', onCloseButtonEnterPress);
    scaleBiggerButton.addEventListener('click', window.scaleEvents.onBiggerButtonClick);
    scaleSmallerButton.addEventListener('click', window.scaleEvents.onSmallerButtonClick);
    effectPin.addEventListener('mousedown', window.effectEvents.onPinMousedown);
    effectButtons.forEach(function (button) {
      window.effectEvents.activateEffect(button);
    });
    hashtagsInput.addEventListener('input', window.hashtagsValidity);
  };

  var closeEditor = function () {
    resetValue();

    editor.classList.add(window.utils.ClassName.HIDDEN);
    uploadButton.value = null;

    document.removeEventListener('keydown', onEditorEscPress);
    closeButton.removeEventListener('click', closeEditor);
    closeButton.removeEventListener('keydown', onCloseButtonEnterPress);
    scaleBiggerButton.removeEventListener('click', window.scaleEvents.onBiggerButtonClick);
    scaleSmallerButton.removeEventListener('click', window.scaleEvents.onSmallerButtonClick);
    effectPin.removeEventListener('mousedown', window.effectEvents.onPinMousedown);
    hashtagsInput.removeEventListener('input', window.hashtagsValidity);
  };

  uploadButton.addEventListener('change', openEditor);

  window.editorEvents = {
    close: closeEditor
  };
})();
