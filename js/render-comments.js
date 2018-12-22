'use strict';

(function () {
  var Parameter = {
    AVATAR_SIZE: 35,
  };
  var Selector = {
    ITEM: 'social__comment',
    TEXT: 'social__text',
    AVATAR: 'social__picture'
  };

  var createComment = function (commentData) {
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

  window.renderComments = function (commentsData, commentsCount) {
    var commentsFragment = document.createDocumentFragment();

    for (var i = 0; i < commentsCount; i++) {
      commentsFragment.appendChild(createComment(commentsData[i]));
    }

    return commentsFragment;
  };
})();
