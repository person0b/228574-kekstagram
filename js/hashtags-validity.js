'use strict';

(function () {
  var Parameters = {
    MAX_LENGTH: 20,
    MAX_COUNT: 5
  };
  var Special = {
    SEPARATOR: ' ',
    START_SYMBOL: '#',
    BANNED_SYMBOLS: ['.', ',']
  };
  var AlertStrings = {
    NO_HASH: 'Хэш-тег должен начинаться с символа # (решётка)',
    LENGTH_MAX: 'Максимальная длина одного хэш-тега ' + Parameters.MAX_LENGTH.toString() + ' символов, включая решётку;',
    LENGTH_MIN: 'Хеш-тег не может состоять только из одной решётки',
    SPLIT: 'Хэш-теги должны разделяться пробелами',
    COUNT: 'Нельзя указать больше пяти хэш-тегов',
    DUPLICATE: 'Один и тот же хэш-тег не может быть использован дважды, теги нечувствительны к регистру'
  };

  window.hashtagsValidity = function (evt) {
    var target = evt.target;
    var string = target.value;
    var hashtags = string.split(Special.SEPARATOR);

    if (hashtags.length > Parameters.MAX_COUNT) {
      target.setCustomValidity(AlertStrings.COUNT);
      return;
    }

    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i].length > 0) {
        if (!hashtags[i].startsWith(Special.START_SYMBOL)) {
          target.setCustomValidity(AlertStrings.NO_HASH);
          return;
        }
        if (hashtags[i].length === 1) {
          target.setCustomValidity(AlertStrings.LENGTH_MIN);
          return;
        }
        if (hashtags[i].length > Parameters.MAX_LENGTH) {
          target.setCustomValidity(AlertStrings.LENGTH_MAX);
          return;
        }

        for (var s = 0; s < Special.BANNED_SYMBOLS.length; s++) {
          if (hashtags[i].includes(Special.BANNED_SYMBOLS[s])) {
            target.setCustomValidity(AlertStrings.SPLIT);
            return;
          }
        }

        for (var j = i + 1; j < hashtags.length; j++) {
          if (hashtags[i].toLowerCase() === hashtags[j].toLowerCase()) {
            target.setCustomValidity(AlertStrings.DUPLICATE);
            return;
          }
        }
      }
    }

    target.setCustomValidity('');
    return;
  };
})();
