export function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function sortObjectFunc(object, key, func, reverse = false) {
    if (!object || !key || !func) return null
    return (object.sort(function(a, b){
        if (func(a[key]) > func(b[key])) {return 1}
        if (func(a[key]) < func(b[key])) {return -1}
        return 0
    }));
}

export function sortObject(object, key) {
    if (!object || !key) return null
    return (object.sort(function(a, b){
        if ((a[key]) > (b[key])) {return 1}
        if ((a[key]) < (b[key])) {return -1}
        return 0
    }));
}

export function toUpper(s){
    return s.toUpperCase()
}

export function copyStringToClipboard (str) {
    var el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
 }