  function ExtensionError(message) {
    Error.apply(this, arguments);
    this.message = message;
  }
  ExtensionError.prototype = Object.create(Error);

  function LocalFileError(message) {
    Error.apply(this, arguments);
    this.message = message;
  }
  LocalFileError.prototype = Object.create(ExtensionError);

  function NoFileAccessError(message) {
    Error.apply(this, arguments);
    this.message = message;
  }
  NoFileAccessError.prototype = Object.create(ExtensionError);

  function RestrictedProtocolError(message) {
    Error.apply(this, arguments);
    this.message = message;
  }
  RestrictedProtocolError.prototype = Object.create(ExtensionError);

  module.exports.ExtensionError = exports.ExtensionError = ExtensionError;
  module.exports.LocalFileError = exports.LocalFileError = LocalFileError;
  module.exports.NoFileAccessError = exports.NoFileAccessError = NoFileAccessError;
  module.exports.RestrictedProtocolError = exports.RestrictedProtocolError = RestrictedProtocolError;
