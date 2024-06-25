const cryptoJs = require('crypto-js')
function dataEncrypter(inputData, secretkey){
    if(inputData){
        const encryptedData = cryptoJs.AES.encrypt(inputData, secretkey).toString();
        // const encodedData = Buffer.from(encryptedData).toString('base64');
        return encryptedData
    }
}
function dataDecrypter(encryptedData, secretkey) {
    if (encryptedData) {
      const bytes = cryptoJs.AES.decrypt(encryptedData, secretkey);
      const decryptedData = bytes.toString(cryptoJs.enc.Utf8);
      return decryptedData;
    }
    return null; // Handle cases where encryptedData is empty or undefined
  }

module.exports = {dataEncrypter,dataDecrypter}
