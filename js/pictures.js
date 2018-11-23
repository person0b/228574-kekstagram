'use strict';

var PictureParameter = {
  COMMENTS: [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ],
  DESCRIPTIONS: [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ],
  COUNT: 25,
  LIKES_MIN: 15,
  LIKES_MAX: 200,
  COMMENTS_COUNT__MAX: 10,
  FILE_DIR: 'photos/',
  FILE_EXTENSION: '.jpg'
};

var Picture = {
  TEMPLATE: '#picture',
  LIST: '.pictures',
  ITEM: '.picture',
  IMAGE: '.picture__img',
  COMMENTS: '.picture__comments',
  LIKES: '.picture__likes'
};

var BigPicture = {
  NUMBER: 0,
  WINDOW: '.big-picture',
  IMAGE: '.big-picture__img',
  LIKES: '.likes-count',
  COMMENTS: '.comments-count',
  DESCRIPTION: '.social__caption'
};

var Comments = {
  LIST: '.social__comments',
  ITEM: 'social__comment',
  TEXT: 'social__text',
  AVATAR: 'social__picture',
  AVATAR_COUNT: 6,
  AVATAR_URL: 'img/avatar-',
  AVATAR_EXTENSION: '.svg',
  AVATAR_ALT: 'Аватар комментатора фотографии',
  AVATAR_SIZE: 35,
  COUNT: '.social__comment-count',
  LOADER: '.comments-loader'
};

var Class = {
  HIDDEN: 'hidden',
  VISUALLY_HIDDEN: 'visually-hidden'
};

var pictureTemlate = document.querySelector(Picture.TEMPLATE).content.querySelector(Picture.ITEM);
var pictureList = document.querySelector(Picture.LIST);
var bigPicture = document.querySelector(BigPicture.WINDOW);

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getValue = function (arr) {
  return arr[getRandomInt(0, arr.length)];
};

var createPicture = function (number, commentsArr, descriptionsArr) {
  var picture = {};

  picture.url = PictureParameter.FILE_DIR + (number + 1) + PictureParameter.FILE_EXTENSION;
  picture.likes = getRandomInt(PictureParameter.LIKES_MIN, PictureParameter.LIKES_MAX + 1);

  picture.comments = [];
  var commentsCount = getRandomInt(0, PictureParameter.COMMENTS_COUNT__MAX + 1);
  for (var i = 0; i < commentsCount; i++) {
    if (Math.random() > 0.5) {
      picture.comments.push(getValue(commentsArr) + ' ' + getValue(commentsArr));
    } else {
      picture.comments.push(getValue(commentsArr));
    }
  }

  picture.description = getValue(descriptionsArr);

  return picture;
};

var addPictures = function (count) {
  var picturesArr = [];

  for (var i = 0; i < count; i++) {
    picturesArr.push(createPicture(i, PictureParameter.COMMENTS, PictureParameter.DESCRIPTIONS));
  }

  return picturesArr;
};

var renderPicture = function (picture) {
  var pictureElement = pictureTemlate.cloneNode(true);

  pictureElement.querySelector(Picture.IMAGE).src = picture.url;
  pictureElement.querySelector(Picture.LIKES).textContent = picture.likes;
  pictureElement.querySelector(Picture.COMMENTS).textContent = picture.comments.length;

  return pictureElement;
};

var createPicturesFragment = function (picturesArr) {
  var picturesFragment = document.createDocumentFragment();

  for (var i = 0; i < picturesArr.length; i++) {
    picturesFragment.appendChild(renderPicture(picturesArr[i]));
  }

  return picturesFragment;
};

var renderComment = function (commentText) {
  var comment = document.createElement('li');
  var avatar = document.createElement('img');
  var text = document.createElement('p');

  comment.classList.add(Comments.ITEM);

  avatar.classList.add(Comments.AVATAR);
  avatar.src = Comments.AVATAR_URL + getRandomInt(1, Comments.AVATAR_COUNT + 1) + Comments.AVATAR_EXTENSION;
  avatar.alt = Comments.AVATAR_ALT;
  avatar.width = Comments.AVATAR_SIZE;
  avatar.height = Comments.AVATAR_SIZE;
  comment.appendChild(avatar);

  text.classList.add(Comments.TEXT);
  text.textContent = commentText;
  comment.appendChild(text);

  return comment;
};

var createCommentsFragment = function (commentsArr) {
  var commentsFragment = document.createDocumentFragment();

  for (var i = 0; i < commentsArr.length; i++) {
    commentsFragment.appendChild(renderComment(commentsArr[i]));
  }

  return commentsFragment;
};

var removeChildren = function (element) {
  while (element.lastChild) {
    element.removeChild(element.lastChild);
  }
};

var renderBigPicture = function (pictureData) {
  bigPicture.querySelector(BigPicture.IMAGE).querySelector('img').src = pictureData.url;
  bigPicture.querySelector(BigPicture.LIKES).textContent = pictureData.likes;
  bigPicture.querySelector(BigPicture.COMMENTS).textContent = pictureData.comments.length;
  bigPicture.querySelector(BigPicture.DESCRIPTION).textContent = pictureData.description;
  removeChildren(bigPicture.querySelector(Comments.LIST));
  bigPicture.querySelector(Comments.LIST).appendChild(createCommentsFragment(pictureData.comments));
};

pictureList.appendChild(createPicturesFragment(addPictures(PictureParameter.COUNT)));

renderBigPicture(addPictures(PictureParameter.COUNT)[BigPicture.NUMBER]);
bigPicture.querySelector(Comments.COUNT).classList.add(Class.VISUALLY_HIDDEN);
bigPicture.querySelector(Comments.LOADER).classList.add(Class.VISUALLY_HIDDEN);
bigPicture.classList.remove(Class.HIDDEN);
