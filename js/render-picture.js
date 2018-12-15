'use strict';

(function () {
  var Selector = {
    IMAGE: '.big-picture__img',
    LIKES: '.likes-count',
    COMMENTS_COUNT: '.comments-count',
    COMMENTS_LIST: '.social__comments',
    COMMENTS_MORE_COUNT: '.social__comment-count',
    COMMENTS_LOADER: '.comments-loader',
    DESCRIPTION: '.social__caption'
  };

  var bigPicture = window.utils.pictureModal;
  var image = bigPicture.querySelector(Selector.IMAGE).querySelector('img');
  var likes = bigPicture.querySelector(Selector.LIKES);
  var commentsCount = bigPicture.querySelector(Selector.COMMENTS_COUNT);
  var description = bigPicture.querySelector(Selector.DESCRIPTION);
  var commentsList = bigPicture.querySelector(Selector.COMMENTS_LIST);
  var commentsMoreCount = bigPicture.querySelector(Selector.COMMENTS_MORE_COUNT);
  var commentsLoader = bigPicture.querySelector(Selector.COMMENTS_LOADER);

  window.renderPicture = function (pictureObject) {
    image.src = pictureObject.url;
    likes.textContent = pictureObject.likes;
    commentsCount.textContent = pictureObject.comments.length;
    description.textContent = pictureObject.description;
    window.utils.removeChildren(commentsList);
    commentsList.appendChild(window.renderComments(pictureObject.comments));

    commentsMoreCount.classList.add(window.utils.className.VISUALLY_HIDDEN);
    commentsLoader.classList.add(window.utils.className.VISUALLY_HIDDEN);
  };
})();
