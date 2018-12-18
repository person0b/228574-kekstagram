'use strict';

(function () {
  var Selector = {
    CLOSE_BUTTON: '.big-picture__cancel',
    COMMENTS_LIST: '.social__comments',
    COUNTER: '.social__comment-count',
    LOADER: '.comments-loader'
  };
  var COMMENTS_COUNT_AT_TIME = 5;
  var BODY = document.querySelector('body');


  var bigPicture = window.utils.pictureModal;
  var commentsList = bigPicture.querySelector(Selector.COMMENTS_LIST);
  var commentsCounter = bigPicture.querySelector(Selector.COUNTER);
  var commentsLoader = bigPicture.querySelector(Selector.LOADER);
  var closeButton = bigPicture.querySelector(Selector.CLOSE_BUTTON);

  var pictureOpen = function (preview, photo) {
    var commentsCount = Math.min(COMMENTS_COUNT_AT_TIME, photo.comments.length);
    var onPreviewClick = function (evt) {
      evt.preventDefault();
      window.renderPicture(photo);
      bigPicture.classList.remove(window.utils.className.HIDDEN);
      BODY.classList.add(window.utils.className.MODAL_OPEN);
      window.utils.removeChildren(commentsList);
      commentsList.appendChild(window.renderComments(photo.comments, commentsCount));
      closeButton.addEventListener('click', pictureClose);
      document.addEventListener('keydown', onPictureEscPress);
      commentsMoreCheck();
    };

    var commentsMoreCheck = function () {
      commentsCounter.textContent = commentsCount + ' из ' + photo.comments.length + ' комментариев';
      if (commentsCount < photo.comments.length) {
        commentsLoader.addEventListener('click', onCommentsLoaderClick);
        commentsLoader.classList.remove(window.utils.className.HIDDEN);
      } else {
        commentsLoader.removeEventListener('click', onCommentsLoaderClick);
        commentsLoader.classList.add(window.utils.className.HIDDEN);
      }
    };

    var onCommentsLoaderClick = function () {
      commentsCount = Math.min(commentsCount + COMMENTS_COUNT_AT_TIME, photo.comments.length);
      window.utils.removeChildren(commentsList);
      commentsList.appendChild(window.renderComments(photo.comments, commentsCount));
      commentsMoreCheck();
    };

    preview.addEventListener('click', onPreviewClick);
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
    open: pictureOpen
  };
})();
