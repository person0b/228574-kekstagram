'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';
  var DATA = '/data';

  var ErrorMessages = {
    LOAD: 'Неудалось загрузить изображения',
    ERROR: 'Произошла ошибка соединения',
    TIMEOUT: 'Запрос не успел выполниться за '
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(ErrorMessages.LOAD);
      }
    });
    xhr.addEventListener('error', function () {
      onError(ErrorMessages.ERROR);
    });
    xhr.addEventListener('timeout', function () {
      onError(ErrorMessages.TIMEOUT + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;
    xhr.open('GET', URL + DATA);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad();
      } else {
        onError(ErrorMessages.LOAD);
      }
    });
    xhr.addEventListener('error', function () {
      onError(ErrorMessages.ERROR);
    });
    xhr.addEventListener('timeout', function () {
      onError(ErrorMessages.TIMEOUT + xhr.timeout + 'мс');
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
