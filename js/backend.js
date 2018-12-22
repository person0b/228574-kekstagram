'use strict';

(function () {
  var ServerParameter = {
    URL: 'https://js.dump.academy/kekstagram',
    DATA: '/data',
    TIMEOUT: 10000
  };

  var SUCCESS_STATUS_CODE = 200;

  var ErrorMessage = {
    LOAD: 'Не получилось загрузить',
    SAVE: 'Не получилось сохранить',
    ERROR: 'Произошла ошибка соединения',
    TIMEOUT: 'Запрос не успел выполниться за ' + ServerParameter.TIMEOUT + ' мс'
  };


  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status !== SUCCESS_STATUS_CODE) {
          onError(ErrorMessage.LOAD);
          return;
        }
        onLoad(xhr.response);
        return;
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
    },

    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status !== SUCCESS_STATUS_CODE) {
          onError(ErrorMessage.LOAD);
          return;
        }
        onLoad();
        return;
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
    }
  };
})();
