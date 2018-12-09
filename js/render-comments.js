'use strict';

(function () {
  var Parameters = {
    AVATAR_COUNT: 6,
    AVATAR_URL: 'img/avatar-',
    AVATAR_EXTENSION: '.svg',
    AVATAR_ALT: 'Аватар комментатора фотографии',
    AVATAR_SIZE: 35
  };
  var Selectors = {
    LIST: '.social__comments',
    ITEM: 'social__comment',
    TEXT: 'social__text',
    AVATAR: 'social__picture',
    COUNT: '.social__comment-count',
    LOADER: '.comments-loader'
  };

  var renderComment = function (commentText) {
    var comment = document.createElement('li');
    var avatar = document.createElement('img');
    var text = document.createElement('p');

    comment.classList.add(Selectors.ITEM);

    avatar.classList.add(Selectors.AVATAR);
    avatar.src = Parameters.AVATAR_URL + window.utils.getRandomInt(1, Parameters.AVATAR_COUNT + 1) + Parameters.AVATAR_EXTENSION;
    avatar.alt = Parameters.AVATAR_ALT;
    avatar.width = Parameters.AVATAR_SIZE;
    avatar.height = Parameters.AVATAR_SIZE;
    comment.appendChild(avatar);

    text.classList.add(Selectors.TEXT);
    text.textContent = commentText;
    comment.appendChild(text);

    return comment;
  };

  var createCommentsFragment = function (comments) {
    var commentsFragment = document.createDocumentFragment();

    for (var i = 0; i < comments.length; i++) {
      commentsFragment.appendChild(renderComment(comments[i]));
    }

    return commentsFragment;
  };

  window.renderComments = createCommentsFragment;
})();
