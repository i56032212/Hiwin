var index = 0;

function insertDataBox(i, line) {
    var datas = line.split(',');
    var trid = datas[0];
    var trdatatime = datas[1];
    var userid = datas[2];
    setCookie("UserID",userid, 1);

    listboxJQ.append("<div id='dtbox" + i + "'>" + trdatatime + "</div>");
    var dtbox = $("#dtbox" + i);
    dtbox.css({
        "position": "relative",
        "background": "rgba(102, 102, 102, 1.0)",
        "opacity": "0",
        "width": "90%",
        "height": "25px",
        "margin-top": "5px",
        "margin-bottom": "5px",
        "border-style": "solid",
        "border-color": "rgba(102, 102, 102, 0.0)",
        "border-width": "3px",
        "border-radius": "0px",
        "text-align": "center",
        "color": "white",
        "font-size": "18px",
        "line-height": "25px",
        "font-weight": "500",
        "font-family": "Arial",
        "cursor": "pointer"
    });
    dtbox.css({ "margin-left": "15px" });

    dtbox.click(function () {
        setCookie("TRID", trid, 1);
        window.location = "Dtraining_chrome.html";
    });
}

function showDataBox() {
    if (index >= listlength) {
        index = 0;
        clearInterval(myVar);
    }
    else {
        var dtbox = $("#dtbox" + index);
        dtbox.animate({ opacity: 1 }, 300);
        index++;
    }
}
