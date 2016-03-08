var serverURL = "http://140.127.22.36/Search.aspx";
var actionURL = "http://140.127.22.36/pic/Action/";
var listboxJQ, htmlJQ, idJQ, loadingJQ, reloadJQ, logoutJQ, nameJQ;
var listlength, myVar;
var AccountID, Account, Name, Sex, Finished;
var separate;
var language = 0;

window.onload = function init() {
    htmlJQ = $("#Html");
    listboxJQ = $("#Listbox");
    loadingJQ = $("#Loading");
    reloadJQ = $("#Reload");
    logoutJQ = $("#Logout");
    nameJQ = $("#Name");
    separate = htmlJQ.height() / 70;

    setCssinit();
    setEventinit();

    htmlJQ.css({ "opacity": "1" });
    loadingJQ.hide();
    reloadJQ.show();

    setAccount(getCookie("ID"), getCookie("Permission"), getCookie("Name"), getCookie("Sex"), "0");
}

function setCssinit() {
    listboxJQ.css({
        "margin-left": (0 - (listboxJQ.width() / 2) - 5) + "px",
        "border-style": "solid",
        "border-color": "rgba(102, 102, 102, 0.0)",
        "border-width": "3px",
    });
}

function setEventinit() {
    reloadJQ.click(function () {
        setAccount(AccountID, Account, Name, Sex, Finished);
    });
    logoutJQ.click(function () {
        window.location = "Login_chrome.html";
    })
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
    nameJQ.val(Name);

    Finished = fini;
    loadingJQ.show();
    reloadJQ.hide();
    getList(fini);
}

function getList(finished) {
    listboxJQ.empty();
    loadingJQ.show();
    reloadJQ.hide();
    $.post(serverURL, { Hiwin: "SelectMTraining," + AccountID })
     .fail(function () {
         loadingJQ.hide();
         reloadJQ.show();
     })
     .done(function (data) {
         if (data.length > 0) {
             //alert(data);
             var lines = data.split(';');
             for (var i = 0; i < lines.length; i++) {
                 insertDataBox(i, lines[i]);
             }
             myVar = self.setInterval(function () { showDataBox() }, 50);
         }
         loadingJQ.hide();
     });
}


