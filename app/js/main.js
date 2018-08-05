import '../css/index.css';
import '../css/aa.css';
var test= require('./test.js');
import '../js/jquery-1.7.2.min.js'
document.getElementById('root').appendChild(test())
var oImg = new Image();
oImg.onload = function () {
    $('body').append(oImg)
}
setTimeout(() => {
    console.log('111')
})
oImg.src = require('../img/img.jpg');