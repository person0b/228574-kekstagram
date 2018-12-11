'use strict';

(function () {
  var Selectors = {
    FORM: '.img-upload__form',
    HASHTAGS_INPUT: '.text__hashtags',
    COMMENT_INPUT: '.text__description'
  };
  var INVALID_COLOR = 'red';

  var form = document.querySelector(Selectors.FORM);
  var hashtagsInput = form.querySelector(Selectors.HASHTAGS_INPUT);
  var commentInput = form.querySelector(Selectors.COMMENT_INPUT);

  var onInputInvalid = function (evt) {
    var input = evt.target;
    input.style.borderColor = INVALID_COLOR;
  };

  var onFormSubmit = function (evt) {
    var saveSuccess = function () {
      window.editorEvents.close();
      window.renderMessages('success');
    };
    var saveError = function () {
      window.editorEvents.close();
      window.renderMessages('error');
    };

    window.backend.save(new FormData(form), saveSuccess, saveError);
    evt.preventDefault();
  };

  hashtagsInput.addEventListener('invalid', onInputInvalid);
  commentInput.addEventListener('invalid', onInputInvalid);
  form.addEventListener('submit', onFormSubmit);
})();
