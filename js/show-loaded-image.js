'use strict';

(function () {
  var PREVIEW_SELECTOR = '.img-upload__preview img';
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var editor = window.utils.editorModal;
  var imagePreview = editor.querySelector(PREVIEW_SELECTOR);

  window.showLoadedImage = function (fileChooser) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var isImage = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (isImage) {
      var reader = new FileReader();
      var onImageLoad = function () {
        imagePreview.src = reader.result;
      };

      reader.addEventListener('load', onImageLoad);
      reader.readAsDataURL(file);
    }
  };
})();
