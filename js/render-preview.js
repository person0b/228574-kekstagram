'use strict';

(function () {
  var Selectors = {
    TEMPLATE: '#picture',
    LIST: '.pictures',
    ITEM: '.picture',
    IMAGE: '.picture__img',
    COMMENTS: '.picture__comments',
    LIKES: '.picture__likes'
  };

  var temlate = document.querySelector(Selectors.TEMPLATE).content.querySelector(Selectors.ITEM);
  var list = document.querySelector(Selectors.LIST);

  var renderPreview = function (pictureData) {
    var previewElement = temlate.cloneNode(true);

    previewElement.querySelector(Selectors.IMAGE).src = pictureData.url;
    previewElement.querySelector(Selectors.LIKES).textContent = pictureData.likes;
    previewElement.querySelector(Selectors.COMMENTS).textContent = pictureData.comments.length;

    return previewElement;
  };

  var createPreviewsFragment = function (picturesData) {
    var previewFragment = document.createDocumentFragment();

    for (var i = 0; i < picturesData.length; i++) {
      previewFragment.appendChild(renderPreview(picturesData[i]));
    }

    return previewFragment;
  };

  list.appendChild(createPreviewsFragment(window.picturesData));
})();
