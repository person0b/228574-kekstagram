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
  var ERROR_STYLE = 'width: 100%; padding: 14px; font-size: 18px; font-weight: bold; text-align: center; color: white; background-color: red;';

  var temlate = document.querySelector(Selectors.TEMPLATE).content.querySelector(Selectors.ITEM);
  var list = document.querySelector(Selectors.LIST);

  var renderPreview = function (pictureData) {
    var previewElement = temlate.cloneNode(true);

    previewElement.querySelector(Selectors.IMAGE).src = pictureData.url;
    previewElement.querySelector(Selectors.LIKES).textContent = pictureData.likes;
    previewElement.querySelector(Selectors.COMMENTS).textContent = pictureData.comments.length;

    return previewElement;
  };

  var createPreviews = function (picturesData) {
    var previewFragment = document.createDocumentFragment();

    for (var i = 0; i < picturesData.length; i++) {
      previewFragment.appendChild(renderPreview(picturesData[i]));
    }

    list.appendChild(previewFragment);

    var previews = list.querySelectorAll(Selectors.ITEM);
    for (var j = 0; j < window.picturesData.length; j++) {
      window.pictureEvents.open(previews[j], picturesData[j]);
    }
  };

  var createPreviewsError = function (errorMessage) {
    var element = document.createElement('div');
    element.style = ERROR_STYLE;
    element.textContent = errorMessage;
    list.appendChild(element);
  };

  window.backend.load(createPreviews, createPreviewsError);
})();
