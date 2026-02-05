// CONCATENATED MODULE: ./src/components/verifition/utils/ase.js

/**
 * @word 要加密的内容
 * @keyWord String  服务器随机返回的关键字
 *  */
function aesEncrypt(word) {
  var keyWord = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'XwKsGlMcdPMEhR1B';
  var key = crypto_js_default.a.enc.Utf8.parse(keyWord);
  var srcs = crypto_js_default.a.enc.Utf8.parse(word);
  var encrypted = crypto_js_default.a.AES.encrypt(srcs, key, {
    mode: crypto_js_default.a.mode.ECB,
    padding: crypto_js_default.a.pad.Pkcs7
  });
  return encrypted.toString();
}
