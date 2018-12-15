'use strict';

(function () {
  var Selector = {
    ROOT: 'main',
    ERROR_TEMPLATE: '#error',
    SUCCESS_TEMPLATE: '#success',
    ERROR_ITEM: '.error',
    SUCCESS_ITEM: '.success',
    ERROR_BUTTON: '.error__button',
    SUCCESS_BUTTON: '.success__button'
  };
  var MessageType = {
    ERROR: 'error',
    SUCCESS: 'success'
  };

  var parent = document.querySelector(Selector.ROOT);
  var error = document.querySelector(Selector.ERROR_TEMPLATE).content.querySelector(Selector.ERROR_ITEM);
  var success = document.querySelector(Selector.SUCCESS_TEMPLATE).content.querySelector(Selector.SUCCESS_ITEM);

  var createMessage = function (evtType) {
    var template = success;
    if (evtType === MessageType.ERROR) {
      template = error;
    }

    var message = template.cloneNode(true);
    parent.appendChild(message);

    var button = message.querySelector(Selector.SUCCESS_BUTTON);
    if (evtType === MessageType.ERROR) {
      button = message.querySelector(Selector.ERROR_BUTTON);
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
      if (evt.keyCode === window.utils.keyCode.ESC) {
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
    types: MessageType
  };
})();
