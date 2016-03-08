var serverURL = "http://140.127.22.36/Search.aspx";
var actionURL = "http://140.127.22.36/pic/Action/";
var listboxJQ, htmlJQ, idJQ, loadingJQ, reloadJQ;
var listlength, myVar;
var AccountID, Account, Name, Sex, Finished;
var separate;
var language = 0;

window.onload = function init() {
    htmlJQ = $("#Html");
    listboxJQ = $("#Listbox");
    loadingJQ = $("#Loading");
    reloadJQ = $("#Reload");
    separate = htmlJQ.height() / 70;

    setCssinit();
    setEventinit();
    //setAccount("9", "yan", "張硯勝", "男", "0");
    htmlJQ.css({ "opacity": "1" });
    loadingJQ.hide();
    reloadJQ.show();
}

function setCssinit() {
    listboxJQ.css({
        "margin-left": (0 - (listboxJQ.width() / 2) - 5) + "px",
        "border-style": "solid",
        "border-color": "rgba(102, 102, 102, 0.0)",
        "border-width": "3px",
    });
    var loadcss = {
        "position": "absolute",
        "z-index": "2",
        "height": htmlJQ.width() / 6 + "px",
        "width": htmlJQ.width() / 6 + "px"
    };
    loadingJQ.css(loadcss);
    reloadJQ.css(loadcss);
    loadingJQ.css({
        "left": htmlJQ.width() / 2 - loadingJQ.width() / 2,
        "top": htmlJQ.height() / 2 - loadingJQ.height() / 2
    });
    reloadJQ.css({
        "left": htmlJQ.width() / 2 - reloadJQ.width() / 2,
        "top": htmlJQ.height() / 2 - reloadJQ.height() / 2
    })
}

function setEventinit() {
    reloadJQ.click(function () {
        setAccount(AccountID, Account, Name, Sex, Finished);
    });
}

function setTextLan(lan) {
    language = lan;
}

function FullScreen() {
    Android.setUIOptions();
}

function setAccount(id, Acc, nm, sx, fini) {
    AccountID = id;
    Account = Acc;
    Name = nm;
    Sex = sx;
    Finished = fini;
    loadingJQ.show();
    reloadJQ.hide();
    getList(fini);
}

function getList(finished) {
    listboxJQ.empty();
    loadingJQ.show();
    reloadJQ.hide();
    $.post(serverURL, { Hiwin: "getPatientProgess," + AccountID + "," + finished })
     .fail(function () {
         loadingJQ.hide();
         reloadJQ.show();
         Android.Toast(ListviewStr["unable" + language]);
     })
     .done(function (data) {
         var lines = data.split(';');
         listlength = lines.length - 1;
         for (var i = 0; i < listlength; i++) {
             insertDataBox(i, lines[i]);
         }
         myVar = self.setInterval(function () { showDataBox() }, 100);
         loadingJQ.hide();
     });
}


