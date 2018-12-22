'use strict';

(function () {
  var Selector = {
    IMAGE: '.big-picture__img',
    LIKES: '.likes-count',
    DESCRIPTION: '.social__caption'
  };

  var bigPicture = window.utils.PICTURE_MODAL;
  var image = bigPicture.querySelector(Selector.IMAGE).querySelector('img');
  var like = bigPicture.querySelector(Selector.LIKES);
  var description = bigPicture.querySelector(Selector.DESCRIPTION);

  window.renderPicture = function (pictureObject) {
    image.src = pictureObject.url;
    like.textContent = pictureObject.likes;
    description.textContent = pictureObject.description;
  };
})();
