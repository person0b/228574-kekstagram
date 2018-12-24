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

  var getXhrObject = function () {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = ServerParameter.TIMEOUT;
    return xhr;
  };

  var setXhrEvents = function (request, cbLoad, cbError) {
    request.addEventListener('load', function () {
      if (request.status !== SUCCESS_STATUS_CODE) {
        cbError(ErrorMessage.LOAD);
        return;
      }
      cbLoad(request.response);
      return;
    });
    request.addEventListener('error', function () {
      cbError(ErrorMessage.ERROR);
    });
    request.addEventListener('timeout', function () {
      cbError(ErrorMessage.TIMEOUT);
    });
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = getXhrObject();
      setXhrEvents(xhr, onLoad, onError);

      xhr.open('GET', ServerParameter.URL + ServerParameter.DATA);
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = getXhrObject();
      setXhrEvents(xhr, onLoad, onError);

      xhr.open('POST', ServerParameter.URL);
      xhr.send(data);
    }
  };
})();
