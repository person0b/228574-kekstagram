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

  var bigPicture = window.utils.PICTURE_MODAL;
  var commentsList = bigPicture.querySelector(Selector.COMMENTS_LIST);
  var commentsCounter = bigPicture.querySelector(Selector.COUNTER);
  var commentsLoader = bigPicture.querySelector(Selector.LOADER);
  var closeButton = bigPicture.querySelector(Selector.CLOSE_BUTTON);

  window.pictureEvents = {
    pictureOpen: function (preview, photo) {
      var commentsCount = Math.min(COMMENTS_COUNT_AT_TIME, photo.comments.length);

      var onCommentsLoaderClick = function () {
        commentsCount = Math.min(commentsCount + COMMENTS_COUNT_AT_TIME, photo.comments.length);
        window.utils.removeChildren(commentsList);
        commentsList.appendChild(window.renderComments(photo.comments, commentsCount));
        commentsMoreCheck();
      };

      var commentsMoreCheck = function () {
        commentsCounter.textContent = commentsCount.toString() + ' из ' + photo.comments.length + ' комментариев';
        if (commentsCount < photo.comments.length) {
          commentsLoader.addEventListener('click', onCommentsLoaderClick);
          commentsLoader.classList.remove(window.utils.ClassName.HIDDEN);
        } else {
          commentsLoader.removeEventListener('click', onCommentsLoaderClick);
          commentsLoader.classList.add(window.utils.ClassName.HIDDEN);
        }
      };

      var onPreviewClick = function (evt) {
        evt.preventDefault();
        window.renderPicture(photo);
        bigPicture.classList.remove(window.utils.ClassName.HIDDEN);
        BODY.classList.add(window.utils.ClassName.MODAL_OPEN);
        window.utils.removeChildren(commentsList);
        commentsList.appendChild(window.renderComments(photo.comments, commentsCount));
        closeButton.addEventListener('click', pictureClose);
        document.addEventListener('keydown', onPictureEscPress);
        commentsMoreCheck();
      };

      preview.addEventListener('click', onPreviewClick);
    }
  };

  var pictureClose = function () {
    bigPicture.classList.add(window.utils.ClassName.HIDDEN);
    BODY.classList.remove(window.utils.ClassName.MODAL_OPEN);

    closeButton.removeEventListener('click', pictureClose);
    document.removeEventListener('keydown', onPictureEscPress);
  };

  var onPictureEscPress = function (evt) {
    if (window.keyboard.isEscPressed(evt)) {
      pictureClose();
    }
  };
})();
