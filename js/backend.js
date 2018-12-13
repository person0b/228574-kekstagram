'use strict';

(function () {
  var ServerParameter = {
    URL: 'https://js.dump.academy/kekstagram',
    DATA: '/data',
    TIMEOUT: 10000
  };

  var ErrorMessages = {
    LOAD: 'Не удалось загрузить изображения',
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

    xhr.timeout = ServerParameter.TIMEOUT;
    xhr.open('GET', ServerParameter.URL + ServerParameter.DATA);
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

    xhr.open('POST', ServerParameter.URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
