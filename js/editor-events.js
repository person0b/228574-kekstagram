'use strict';

(function () {
  var Selector = {
    UPLOAD_BUTTON: '#upload-file',
    CLOSE_BUTTON: '.img-upload__cancel',
  };

  var editor = window.utils.EDITOR_MODAL;
  var uploadButton = document.querySelector(Selector.UPLOAD_BUTTON);
  var closeButton = editor.querySelector(Selector.CLOSE_BUTTON);

  var scaleSmallerButton = window.scaleEvents.smallerButton;
  var scaleBiggerButton = window.scaleEvents.biggerButton;

  var effectButtons = window.effectEvents.buttons;
  var effectPin = window.effectEvents.pin;

  var hashtagsInput = window.formEvents.hashtagsInput;
  var commentInput = window.formEvents.commentInput;

  var onEditorEscPress = function (evt) {
    if (window.keyboard.isEscPressed(evt) && document.activeElement !== hashtagsInput && document.activeElement !== commentInput) {
      closeEditor();
    }
  };

  var onCloseButtonEnterPress = function (evt) {
    if (window.keyboard.isEnterPressed(evt)) {
      closeEditor();
    }
  };

  var resetValue = function () {
    window.scaleEvents.reset();
    window.effectEvents.reset();
    window.loadedPreview.reset();
    window.formEvents.inputReset();
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
    window.formEvents.addFormEvents();
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
    window.formEvents.removeFormEvents();
  };

  uploadButton.addEventListener('change', openEditor);

  window.editorEvents = {
    close: closeEditor
  };
})();
