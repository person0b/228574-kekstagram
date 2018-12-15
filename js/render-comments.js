'use strict';

(function () {
  var Parameter = {
    AVATAR_SIZE: 35,
    COMMENTS_COUNT: 5
  };
  var Selector = {
    LIST: '.social__comments',
    ITEM: 'social__comment',
    TEXT: 'social__text',
    AVATAR: 'social__picture',
    COUNT: '.social__comment-count',
    LOADER: '.comments-loader'
  };

  var renderComment = function (commentData) {
    var comment = document.createElement('li');
    var avatar = document.createElement('img');
    var text = document.createElement('p');

    comment.classList.add(Selector.ITEM);

    avatar.classList.add(Selector.AVATAR);
    avatar.src = commentData.avatar;
    avatar.title = commentData.name;
    avatar.alt = commentData.name;
    avatar.width = Parameter.AVATAR_SIZE;
    avatar.height = Parameter.AVATAR_SIZE;
    comment.appendChild(avatar);

    text.classList.add(Selector.TEXT);
    text.textContent = commentData.message;
    comment.appendChild(text);

    return comment;
  };

  var createCommentsFragment = function (comments) {
    var commentsFragment = document.createDocumentFragment();

    for (var i = 0; i < Math.min(Parameter.COMMENTS_COUNT, comments.length); i++) {
      commentsFragment.appendChild(renderComment(comments[i]));
    }

    return commentsFragment;
  };

  window.renderComments = createCommentsFragment;
})();
