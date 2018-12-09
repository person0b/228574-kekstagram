'use strict';

(function () {
  var Selectors = {
    IMAGE: '.big-picture__img',
    LIKES: '.likes-count',
    COMMENTS_COUNT: '.comments-count',
    COMMENTS_LIST: '.social__comments',
    COMMENTS_MORE_COUNT: '.social__comment-count',
    COMMENTS_LOADER: '.comments-loader',
    DESCRIPTION: '.social__caption'
  };

  var bigPicture = window.utils.pictureModal;
  var image = bigPicture.querySelector(Selectors.IMAGE).querySelector('img');
  var likes = bigPicture.querySelector(Selectors.LIKES);
  var commentsCount = bigPicture.querySelector(Selectors.COMMENTS_COUNT);
  var description = bigPicture.querySelector(Selectors.DESCRIPTION);
  var commentsList = bigPicture.querySelector(Selectors.COMMENTS_LIST);
  var commentsMoreCount = bigPicture.querySelector(Selectors.COMMENTS_MORE_COUNT);
  var commentsLoader = bigPicture.querySelector(Selectors.COMMENTS_LOADER);

  window.renderPicture = function (pictureObject) {
    image.src = pictureObject.url;
    likes.textContent = pictureObject.likes;
    commentsCount.textContent = pictureObject.comments.length;
    description.textContent = pictureObject.description;
    window.utils.removeChildren(commentsList);
    commentsList.appendChild(window.renderComments(pictureObject.comments));

    commentsMoreCount.classList.add(window.utils.classNames.VISUALLY_HIDDEN);
    commentsLoader.classList.add(window.utils.classNames.VISUALLY_HIDDEN);
  };
})();
