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

  var onInputInvalid = function (evt) {
    var input = evt.target;
    input.style.borderColor = INVALID_COLOR;
  };

  var onFormSubmit = function (evt) {
    var saveSuccess = function () {
      window.editorEvents.close();
      window.renderMessages.create(window.renderMessages.types.SUCCESS);
    };
    var saveError = function () {
      window.editorEvents.close();
      window.renderMessages.create(window.renderMessages.types.ERROR);
    };

    window.backend.save(new FormData(form), saveSuccess, saveError);
    evt.preventDefault();
  };

  hashtagsInput.addEventListener('invalid', onInputInvalid);
  commentInput.addEventListener('invalid', onInputInvalid);
  form.addEventListener('submit', onFormSubmit);
})();
