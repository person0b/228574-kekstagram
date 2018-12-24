'use strict';

(function () {
  var Parameter = {
    MAX_LENGTH: 20,
    MAX_COUNT: 5
  };
  var Special = {
    SEPARATOR: /\s+/,
    START_SYMBOL: '#',
    BANNED_SYMBOLS: ['.', ',']
  };
  var AlertString = {
    NO_HASH: 'Хэш-тег должен начинаться с символа # (решётка)',
    LENGTH_MAX: 'Максимальная длина одного хэш-тега ' + Parameter.MAX_LENGTH.toString() + ' символов, включая решётку;',
    LENGTH_MIN: 'Хеш-тег не может состоять только из одной решётки',
    SPLIT: 'Хэш-теги должны разделяться пробелами',
    COUNT: 'Нельзя указать больше пяти хэш-тегов',
    DUPLICATE: 'Один и тот же хэш-тег не может быть использован дважды, теги нечувствительны к регистру'
  };

  window.onHashtagsValidity = function (evt) {
    var target = evt.target;
    var string = target.value;
    var hashtags = string.split(Special.SEPARATOR);

    if (string.length === 0) {
      target.setCustomValidity('');
      return;
    }

    if (hashtags.length > Parameter.MAX_COUNT) {
      target.setCustomValidity(AlertString.COUNT);
      return;
    }

    for (var i = 0; i < hashtags.length; i++) {
      if (!hashtags[i].startsWith(Special.START_SYMBOL)) {
        target.setCustomValidity(AlertString.NO_HASH);
        return;
      }
      if (hashtags[i].lastIndexOf(Special.START_SYMBOL) > 0) {
        target.setCustomValidity(AlertString.SPLIT);
        return;
      }
      if (hashtags[i].length === 1) {
        target.setCustomValidity(AlertString.LENGTH_MIN);
        return;
      }
      if (hashtags[i].length > Parameter.MAX_LENGTH) {
        target.setCustomValidity(AlertString.LENGTH_MAX);
        return;
      }

      for (var s = 0; s < Special.BANNED_SYMBOLS.length; s++) {
        if (hashtags[i].includes(Special.BANNED_SYMBOLS[s])) {
          target.setCustomValidity(AlertString.SPLIT);
          return;
        }
      }

      for (var j = i + 1; j < hashtags.length; j++) {
        if (hashtags[i].toLowerCase() === hashtags[j].toLowerCase()) {
          target.setCustomValidity(AlertString.DUPLICATE);
          return;
        }
      }
    }

    target.setCustomValidity('');
    return;
  };
})();
