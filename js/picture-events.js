'use strict';

(function () {
  var Selector = {
    CLOSE_BUTTON: '.big-picture__cancel'
  };
  var BODY = document.querySelector('body');


  var bigPicture = window.utils.pictureModal;
  var closeButton = bigPicture.querySelector(Selector.CLOSE_BUTTON);

  var addPreviewClickHandler = function (preview, photo) {
    var pictureOpen = function (evt) {
      evt.preventDefault();
      window.renderPicture(photo);
      bigPicture.classList.remove(window.utils.className.HIDDEN);
      BODY.classList.add(window.utils.className.MODAL_OPEN);

      closeButton.addEventListener('click', pictureClose);
      document.addEventListener('keydown', onPictureEscPress);
    };

    preview.addEventListener('click', pictureOpen);
  };

  var pictureClose = function () {
    bigPicture.classList.add(window.utils.className.HIDDEN);
    BODY.classList.remove(window.utils.className.MODAL_OPEN);

    closeButton.removeEventListener('click', pictureClose);
    document.removeEventListener('keydown', onPictureEscPress);
  };

  var onPictureEscPress = function (evt) {
    if (evt.keyCode === window.utils.keyCode.ESC) {
      pictureClose();
    }
  };

  window.pictureEvents = {
    open: addPreviewClickHandler
  };
})();
