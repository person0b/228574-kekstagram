'use strict';

(function () {
  var Selectors = {
    PREVIEW: '.picture',
    CLOSE_BUTTON: '.big-picture__cancel'
  };
  var BODY = document.querySelector('body');


  var previews = document.querySelectorAll(Selectors.PREVIEW);
  var bigPicture = window.utils.pictureModal;
  var closeButton = bigPicture.querySelector(Selectors.CLOSE_BUTTON);

  var addPreviewClickHandler = function (preview, photo) {
    var pictureOpen = function (evt) {
      evt.preventDefault();
      window.renderPicture(photo);
      bigPicture.classList.remove(window.utils.classNames.HIDDEN);
      BODY.classList.add(window.utils.classNames.MODAL_OPEN);

      closeButton.addEventListener('click', pictureClose);
      document.addEventListener('keydown', onPictureEscPress);
    };

    preview.addEventListener('click', pictureOpen);
  };

  var pictureClose = function () {
    bigPicture.classList.add(window.utils.classNames.HIDDEN);
    BODY.classList.remove(window.utils.classNames.MODAL_OPEN);

    closeButton.removeEventListener('click', pictureClose);
    document.removeEventListener('keydown', onPictureEscPress);
  };

  var onPictureEscPress = function (evt) {
    if (evt.keyCode === window.utils.keyCodes.ESC) {
      pictureClose();
    }
  };

  for (var i = 0; i < window.picturesData.length; i++) {
    addPreviewClickHandler(previews[i], window.picturesData[i]);
  }
})();
