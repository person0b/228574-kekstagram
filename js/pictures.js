'use strict';

var PictureGeneratorParameters = {
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

var PreviewSelectors = {
  TEMPLATE: '#picture',
  LIST: '.pictures',
  ITEM: '.picture',
  IMAGE: '.picture__img',
  COMMENTS: '.picture__comments',
  LIKES: '.picture__likes'
};

var PictureSelectors = {
  WINDOW: '.big-picture',
  IMAGE: '.big-picture__img',
  LIKES: '.likes-count',
  COMMENTS: '.comments-count',
  DESCRIPTION: '.social__caption'
};

var CommentParameters = {
  AVATAR_COUNT: 6,
  AVATAR_URL: 'img/avatar-',
  AVATAR_EXTENSION: '.svg',
  AVATAR_ALT: 'Аватар комментатора фотографии',
  AVATAR_SIZE: 35
};

var CommentSelectors = {
  LIST: '.social__comments',
  ITEM: 'social__comment',
  TEXT: 'social__text',
  AVATAR: 'social__picture',
  COUNT: '.social__comment-count',
  LOADER: '.comments-loader'
};

var HiddenClassNames = {
  HIDDEN: 'hidden',
  VISUALLY_HIDDEN: 'visually-hidden'
};

var previewTemlate = document.querySelector(PreviewSelectors.TEMPLATE).content.querySelector(PreviewSelectors.ITEM);
var previewList = document.querySelector(PreviewSelectors.LIST);
var pictureWindow = document.querySelector(PictureSelectors.WINDOW);

var getRandomInt = function (min, max) {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomElement = function (list) {
  return list[getRandomInt(list.length)];
};

var createPictureObject = function (index, comments, descriptions) {
  var picture = {};

  picture.url = PictureGeneratorParameters.FILE_DIR + (index + 1) + PictureGeneratorParameters.FILE_EXTENSION;
  picture.likes = getRandomInt(PictureGeneratorParameters.LIKES_MIN, PictureGeneratorParameters.LIKES_MAX + 1);

  picture.comments = [];
  var commentsCount = getRandomInt(PictureGeneratorParameters.COMMENTS_COUNT__MAX + 1);
  for (var i = 0; i < commentsCount; i++) {
    if (Math.random() > 0.5) {
      picture.comments.push(getRandomElement(comments) + ' ' + getRandomElement(comments));
    } else {
      picture.comments.push(getRandomElement(comments));
    }
  }

  picture.description = getRandomElement(descriptions);

  return picture;
};

var createPicturesArray = function (count) {
  var pictures = [];

  for (var i = 0; i < count; i++) {
    pictures.push(createPictureObject(i, PictureGeneratorParameters.COMMENTS, PictureGeneratorParameters.DESCRIPTIONS));
  }

  return pictures;
};

var renderPreview = function (picture) {
  var previewElement = previewTemlate.cloneNode(true);

  previewElement.querySelector(PreviewSelectors.IMAGE).src = picture.url;
  previewElement.querySelector(PreviewSelectors.LIKES).textContent = picture.likes;
  previewElement.querySelector(PreviewSelectors.COMMENTS).textContent = picture.comments.length;

  return previewElement;
};

var createPreviewsFragment = function (pictures) {
  var previewFragment = document.createDocumentFragment();

  for (var i = 0; i < pictures.length; i++) {
    previewFragment.appendChild(renderPreview(pictures[i]));
  }

  return previewFragment;
};

var renderComment = function (commentText) {
  var comment = document.createElement('li');
  var avatar = document.createElement('img');
  var text = document.createElement('p');

  comment.classList.add(CommentSelectors.ITEM);

  avatar.classList.add(CommentSelectors.AVATAR);
  avatar.src = CommentParameters.AVATAR_URL + getRandomInt(1, CommentParameters.AVATAR_COUNT + 1) + CommentParameters.AVATAR_EXTENSION;
  avatar.alt = CommentParameters.AVATAR_ALT;
  avatar.width = CommentParameters.AVATAR_SIZE;
  avatar.height = CommentParameters.AVATAR_SIZE;
  comment.appendChild(avatar);

  text.classList.add(CommentSelectors.TEXT);
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

var removeChildren = function (element) {
  while (element.lastChild) {
    element.removeChild(element.lastChild);
  }
};

var renderPicture = function (pictureObject) {
  pictureWindow.querySelector(PictureSelectors.IMAGE).querySelector('img').src = pictureObject.url;
  pictureWindow.querySelector(PictureSelectors.LIKES).textContent = pictureObject.likes;
  pictureWindow.querySelector(PictureSelectors.COMMENTS).textContent = pictureObject.comments.length;
  pictureWindow.querySelector(PictureSelectors.DESCRIPTION).textContent = pictureObject.description;
  removeChildren(pictureWindow.querySelector(CommentSelectors.LIST));
  pictureWindow.querySelector(CommentSelectors.LIST).appendChild(createCommentsFragment(pictureObject.comments));
};

var picturesArray = createPicturesArray(PictureGeneratorParameters.COUNT);

previewList.appendChild(createPreviewsFragment(picturesArray));

renderPicture(picturesArray[0]);
pictureWindow.querySelector(CommentSelectors.COUNT).classList.add(HiddenClassNames.VISUALLY_HIDDEN);
pictureWindow.querySelector(CommentSelectors.LOADER).classList.add(HiddenClassNames.VISUALLY_HIDDEN);
pictureWindow.classList.remove(HiddenClassNames.HIDDEN);
