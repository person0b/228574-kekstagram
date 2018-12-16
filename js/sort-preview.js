'use strict';

(function () {
  var Selector = {
    LIST_PREVIEW: '.pictures',
    PREVIEW: '.picture',
    FILTERS: '.img-filters',
    POPULAR: '#filter-popular',
    NEW: '#filter-new',
    DISCUSSED: '#filter-discussed'
  };
  var ClassName = {
    INACTIVE: 'img-filters--inactive',
    BUTTON_ACTIVE: 'img-filters__button--active'
  };
  var ERROR_STYLE = 'width: 100%; padding: 14px; font-size: 18px; font-weight: bold; text-align: center; color: white; background-color: red;';
  var NEW_PICTURES_COUNT = 10;

  var listPreview = document.querySelector(Selector.LIST_PREVIEW);
  var filters = document.querySelector(Selector.FILTERS);
  var popularButton = filters.querySelector(Selector.POPULAR);
  var newButton = filters.querySelector(Selector.NEW);
  var discussedButton = filters.querySelector(Selector.DISCUSSED);

  var picturesData = [];

  var sortNewPictures = function () {
    var newPictures = [];

    while (newPictures.length < NEW_PICTURES_COUNT) {
      newPictures.push(window.utils.getRandomElement(picturesData));
      newPictures = newPictures.filter(function (it, i) {
        return newPictures.indexOf(it) === i;
      });
    }

    return newPictures;
  };

  var sortDiscussedPictures = function () {
    var discussedPictures = picturesData.slice();
    return discussedPictures.sort(function (a, b) {
      return (b.comments.length - a.comments.length);
    });
  };

  var removePreviews = function () {
    var previews = listPreview.querySelectorAll(Selector.PREVIEW);

    for (var i = 0; i < previews.length; i++) {
      listPreview.removeChild(previews[i]);
    }
  };

  var updatePreview = function (pictures) {
    removePreviews();
    window.renderPreview(pictures);
  };

  var switchActiveButtonClassName = function (target) {
    popularButton.classNameList.toggle(ClassName.BUTTON_ACTIVE, popularButton === target);
    newButton.classNameList.toggle(ClassName.BUTTON_ACTIVE, newButton === target);
    discussedButton.classNameList.toggle(ClassName.BUTTON_ACTIVE, discussedButton === target);
  };

  var onPopularButtonClick = window.utils.debounce(function (evt) {
    switchActiveButtonClassName(evt.target);
    updatePreview(picturesData);
  });

  var onNewButtonClick = window.utils.debounce(function (evt) {
    switchActiveButtonClassName(evt.target);
    updatePreview(sortNewPictures());
  });

  var onDiscussedButtonClick = window.utils.debounce(function (evt) {
    switchActiveButtonClassName(evt.target);
    updatePreview(sortDiscussedPictures());
  });

  var loadPicturesSuccess = function (data) {
    picturesData = data;
    updatePreview(picturesData);
    filters.classNameList.remove(ClassName.INACTIVE);
    popularButton.addEventListener('click', onPopularButtonClick);
    newButton.addEventListener('click', onNewButtonClick);
    discussedButton.addEventListener('click', onDiscussedButtonClick);
  };

  var loadPicturesError = function (errorMessage) {
    var element = document.createElement('div');
    element.style = ERROR_STYLE;
    element.textContent = errorMessage;
    listPreview.appendChild(element);
  };

  window.backend.load(loadPicturesSuccess, loadPicturesError);
})();
