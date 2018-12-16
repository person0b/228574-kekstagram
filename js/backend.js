'use strict';

(function () {
  var ServerParameter = {
    URL: 'https://js.dump.academy/kekstagram',
    DATA: '/data',
    TIMEOUT: 10000
  };

  var ErrorMessage = {
    LOAD: 'Не получилось загрузить',
    SAVE: 'Не получилось сохранить',
    ERROR: 'Произошла ошибка соединения',
    TIMEOUT: 'Запрос не успел выполниться за ' + ServerParameter.TIMEOUT + ' мс'
  };


  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(ErrorMessage.LOAD);
      }
    });
    xhr.addEventListener('error', function () {
      onError(ErrorMessage.ERROR);
    });
    xhr.addEventListener('timeout', function () {
      onError(ErrorMessage.TIMEOUT);
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
        onError(ErrorMessage.LOAD);
      }
    });
    xhr.addEventListener('error', function () {
      onError(ErrorMessage.ERROR);
    });
    xhr.addEventListener('timeout', function () {
      onError(ErrorMessage.TIMEOUT);
    });

    xhr.timeout = ServerParameter.TIMEOUT;
    xhr.open('POST', ServerParameter.URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
