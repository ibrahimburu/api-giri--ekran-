const crypt = require('crypt');

function hash(data){
    return crypt.bytesToWords(data).toString();
} 
module.exports = hash;