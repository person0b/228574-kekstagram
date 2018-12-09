'use strict';

(function () {
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

  var createPictureObject = function (index, comments, descriptions) {
    var picture = {};

    picture.url = PictureGeneratorParameters.FILE_DIR + (index + 1) + PictureGeneratorParameters.FILE_EXTENSION;
    picture.likes = window.utils.getRandomInt(PictureGeneratorParameters.LIKES_MIN, PictureGeneratorParameters.LIKES_MAX + 1);

    picture.comments = [];
    var commentsCount = window.utils.getRandomInt(PictureGeneratorParameters.COMMENTS_COUNT__MAX + 1);
    for (var i = 0; i < commentsCount; i++) {
      if (Math.random() > 0.5) {
        picture.comments.push(window.utils.getRandomElement(comments) + ' ' + window.utils.getRandomElement(comments));
      } else {
        picture.comments.push(window.utils.getRandomElement(comments));
      }
    }

    picture.description = window.utils.getRandomElement(descriptions);

    return picture;
  };

  var createPicturesArray = function (count) {
    var pictures = [];

    for (var i = 0; i < count; i++) {
      pictures.push(createPictureObject(i, PictureGeneratorParameters.COMMENTS, PictureGeneratorParameters.DESCRIPTIONS));
    }

    return pictures;
  };

  window.picturesData = createPicturesArray(PictureGeneratorParameters.COUNT);
})();
