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
  var listFilters = document.querySelector(Selector.FILTERS);
  var popularButton = listFilters.querySelector(Selector.POPULAR);
  var newButton = listFilters.querySelector(Selector.NEW);
  var discussedButton = listFilters.querySelector(Selector.DISCUSSED);

  var picturesData = [];

  var sortNewPictures = function () {
    var copyPictures = picturesData.slice();
    return window.utils.mixArray(copyPictures).slice(0, NEW_PICTURES_COUNT);
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
    popularButton.classList.toggle(ClassName.BUTTON_ACTIVE, popularButton === target);
    newButton.classList.toggle(ClassName.BUTTON_ACTIVE, newButton === target);
    discussedButton.classList.toggle(ClassName.BUTTON_ACTIVE, discussedButton === target);
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

  window.sortPreview = {
    imageLoadedCheck: function (length) {
      var counter = 0;
      var upCounter = function () {
        counter++;
        if (counter === length) {
          listFilters.classList.remove(ClassName.INACTIVE);
        }
      };
      return upCounter;
    }
  };

  var loadPicturesSuccess = function (data) {
    picturesData = data;
    updatePreview(picturesData);
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
