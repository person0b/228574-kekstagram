'use strict';

(function () {
  var Selector = {
    FORM: '.img-upload__form',
    HASHTAGS_INPUT: '.text__hashtags',
    COMMENT_INPUT: '.text__description'
  };
  var INVALID_COLOR = 'red';

  var form = document.querySelector(Selector.FORM);
  var hashtagsInput = form.querySelector(Selector.HASHTAGS_INPUT);
  var commentInput = form.querySelector(Selector.COMMENT_INPUT);
  var defaultBorderColor = hashtagsInput.style.borderColor;

  var onInputInvalid = function (evt) {
    var input = evt.target;
    input.style.borderColor = INVALID_COLOR;
  };

  var onFormSubmit = function (evt) {
    var saveSuccess = function () {
      window.editorEvents.close();
      window.renderMessages.createMessage(window.renderMessages.MessageType.SUCCESS);
    };
    var saveError = function () {
      window.editorEvents.close();
      window.renderMessages.createMessage(window.renderMessages.MessageType.ERROR);
    };

    window.backend.save(new FormData(form), saveSuccess, saveError);
    evt.preventDefault();
  };

  window.formEvents = {
    hashtagsInput: hashtagsInput,
    commentInput: commentInput,
    addFormEvents: function () {
      hashtagsInput.addEventListener('input', window.hashtagsValidity);
      hashtagsInput.addEventListener('invalid', onInputInvalid);
      commentInput.addEventListener('invalid', onInputInvalid);
      form.addEventListener('submit', onFormSubmit);
    },
    removeFormEvents: function () {
      hashtagsInput.removeEventListener('input', window.hashtagsValidity);
      hashtagsInput.removeEventListener('invalid', onInputInvalid);
      commentInput.removeEventListener('invalid', onInputInvalid);
      form.removeEventListener('submit', onFormSubmit);
    },
    inputReset: function () {
      hashtagsInput.value = null;
      commentInput.value = null;
      hashtagsInput.style.borderColor = defaultBorderColor;
      commentInput.style.borderColor = defaultBorderColor;
    }
  };
})();
