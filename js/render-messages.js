'use strict';

(function () {
  var Selectors = {
    ROOT: 'main',
    ERROR_TEMPLATE: '#error',
    SUCCESS_TEMPLATE: '#success',
    ERROR_ITEM: '.error',
    SUCCESS_ITEM: '.success',
    ERROR_BUTTON: '.error__button',
    SUCCESS_BUTTON: '.success__button'
  };
  var MessageTypes = {
    ERROR: 'error',
    SUCCESS: 'success'
  };

  var parent = document.querySelector(Selectors.ROOT);
  var error = document.querySelector(Selectors.ERROR_TEMPLATE).content.querySelector(Selectors.ERROR_ITEM);
  var success = document.querySelector(Selectors.SUCCESS_TEMPLATE).content.querySelector(Selectors.SUCCESS_ITEM);

  var createMessage = function (evtType) {
    var template = success;
    if (evtType === MessageTypes.ERROR) {
      template = error;
    }

    var message = template.cloneNode(true);
    parent.appendChild(message);

    var button = message.querySelector(Selectors.SUCCESS_BUTTON);
    if (evtType === MessageTypes.ERROR) {
      button = message.querySelector(Selectors.ERROR_BUTTON);
    }

    var closeMessage = function () {
      parent.removeChild(message);

      button.removeEventListener('click', onButtonClick);
      window.removeEventListener('keydown', onMessageEscPress);
      message.removeEventListener('click', onMessageClick);
    };

    var onButtonClick = function () {
      closeMessage();
    };

    var onMessageEscPress = function (evt) {
      if (evt.keyCode === window.utils.keyCodes.ESC) {
        closeMessage();
      }
    };

    var onMessageClick = function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
      if (evt.target === message) {
        closeMessage();
      }
    };

    button.addEventListener('click', onButtonClick);
    window.addEventListener('keydown', onMessageEscPress);
    message.addEventListener('click', onMessageClick);
  };

  window.renderMessages = {
    create: createMessage,
    types: MessageTypes
  };
})();
