function iframeAutoHeight(quem) {
    if (navigator.appName.indexOf("Internet Explorer") > -1) {
        var func_temp = function () {
            var val_temp = quem.contentWindow.document.body.scrollHeight + 10
            quem.style.height = val_temp + "px";
        }
        setTimeout(function () { func_temp() }, 100)
    } else {
        var val = quem.contentWindow.document.body.parentNode.offsetHeight + 10
        quem.style.height = val + "px";
    }
}