/*
    Welcome to Mocha.js! Mocha is simply my style of storing all data in a single cookie and compressing
    it to ensure it doesn't reach the limit of ~4kb.
*/

let valueMap = new Map();


function mochaGet(name) {
    
}

function mochaSet() {

}

function mochaUpdate() {

}

function mochaRefresh() {
    
}



function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    var t = cname + "=" + cvalue + ";" + expires + ";path=/";
    document.cookie = t;
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }