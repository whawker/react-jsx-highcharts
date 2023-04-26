const nodeCrypto = require('crypto');

if (!window.crypto) {
  window.crypto = {
    getRandomValues: function (buffer) {
      return nodeCrypto.randomFillSync(buffer);
    }
  };
}
