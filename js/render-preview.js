'use strict';

(function () {
  var Selector = {
    TEMPLATE: '#picture',
    LIST: '.pictures',
    ITEM: '.picture',
    IMAGE: '.picture__img',
    COMMENTS: '.picture__comments',
    LIKES: '.picture__likes'
  };

  var temlate = document.querySelector(Selector.TEMPLATE).content.querySelector(Selector.ITEM);
  var list = document.querySelector(Selector.LIST);

  var createPreview = function (pictureData) {
    var previewElement = temlate.cloneNode(true);

    previewElement.querySelector(Selector.IMAGE).src = pictureData.url;
    previewElement.querySelector(Selector.LIKES).textContent = pictureData.likes;
    previewElement.querySelector(Selector.COMMENTS).textContent = pictureData.comments.length;

    return previewElement;
  };

  window.renderPreview = function (picturesData) {
    var previewFragment = document.createDocumentFragment();
    picturesData.forEach(function (picture) {
      previewFragment.appendChild(createPreview(picture));
    });
    list.appendChild(previewFragment);

    var images = list.querySelectorAll(Selector.IMAGE);
    var onImageLoadEvt = window.sortPreview.imageLoadedCheck(images.length);
    var loadImage = function (image) {
      image.addEventListener('load', onImageLoadEvt);
      image.addEventListener('error', onImageLoadEvt);
    };
    images.forEach(function (image) {
      loadImage(image);
    });

    var previews = list.querySelectorAll(Selector.ITEM);
    for (var i = 0; i < picturesData.length; i++) {
      window.pictureEvents.pictureOpen(previews[i], picturesData[i]);
    }
  };
})();
