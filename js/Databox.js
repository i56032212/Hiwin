var index = 0;

function insertDataBox(i, line) {
    var datas = line.split(',');
    var actid = datas[0];
    var start = datas[1];
    var end = datas[2];
    var name = datas[3];
    var acdesc = datas[4];
    var descr = datas[5];
    var img = datas[6];
    var type = datas[7];
    var finish = datas[8];

    listboxJQ.append("<div id='dtbox" + i + "'></div>");
    var dtbox = $("#dtbox" + i);
    dtbox.css({
        "position": "relative",
        "opacity": "0",
        "width": "94%",
        "height": ((listboxJQ.height() - separate) / 4 - separate - 6) + "px",
        "margin-top": separate + "px",
        "margin-bottom": separate + "px",
        "border-style": "solid",
        "border-color": "rgba(102, 102, 102, 0.0)",
        "border-width": "3px",
        "border-radius": "15px",
    });
    dtbox.css({ "margin-left": (listboxJQ.width() - dtbox.width() - 5) / 2 + "px" });

    dtbox.append("<div id='dtimg" + i + "'></div>");
    var dtimg = $("#dtimg" + i);
    dtimg.css({
        "position": "absolute",
        "height": (dtbox.height() - (dtbox.height() / 10) * 2) * (4 / 6) + "px",
        "width": (dtbox.height() - (dtbox.height() / 10) * 2) * (4 / 6) + "px",
        "border-style": "solid",
        "border-color": "rgba(160, 161, 163, 1.0)",
        "border-width": (dtbox.height() / 10) + "px",
        "border-radius": "100%",
        "background": "rgba(84, 84, 84, 1.0)",
        "background-image": "url('" + actionURL + img + "')",
        "background-repeat": "no-repeat",
        "background-size": "cover",
        "background-position": "center",
    });


    dtbox.append("<div id='dtname" + i + "'><div class='boxtxt'>" + name + "</div></div>");
    var dtname = $("#dtname" + i);
    dtname.css({
        "width": dtbox.width - dtimg.width() / 2 + "px",
        "font-family": "微軟正黑體",
        "font-weight": "700",
        "font-size": (dtbox.height() / 6) / 1.2 + "px",
        "color": "rgba(0, 0, 0, 0.6)",
        "border-style": "none",
        "border-radius": (dtbox.height() / 10) + "px",
        "background": "rgba(225, 225, 225, 1.0)",
        "margin-left": dtimg.width() / 1.5 + "px",
        "height": (dtbox.height() / 6) + "px",
    });

    dtbox.append("<div id='dtsed" + i + "'><div id='dtsedtxt" + i + "' class='boxtxt'>" +
            DataboxStr["start" + language] + start + "<br>" +
            DataboxStr["end" + language] + end + "<br>" +
            DataboxStr["instruc" + language] + descr
        + "</div></div>");
    var dtsed = $("#dtsed" + i);
    var dtsedtxt = $("#dtsedtxt" + i);

    dtsed.css({
        "width": dtbox.width - dtimg.width() / 2 + "px",
        "height": (dtbox.height() / 6) * 4 + "px",
        "font-family": "微軟正黑體",
        "font-weight": "400",
        "font-size": htmlJQ.height() / 45 + "px",
        "color": "rgba(255, 255, 255, 0.9)",
        "border-style": "none",
        "border-radius": (dtbox.height() / 10) + "px " + (dtbox.height() / 10) + "px 0 " + (dtbox.height() / 10) + "px",
        "background": "rgba(185, 185, 185, 1.0)",
        "overflow": "auto",
        "margin-left": dtimg.width() / 1.5 + "px"
    });

    dtsedtxt.css({
        "height": (dtbox.height() / 6) * 3 + "px",
        "font-size": (dtbox.height() / 6) / 1.5 + "px",
        "margin-top": (dtbox.height() / 20) + "px",
        "width": dtsed.width() * 0.7,
        "background": "rgba(100, 100, 100, 0.0)",
    });


    dtbox.append("<div id='dtshowbt" + i + "'>+</div>");
    var dtshowbt = $("#dtshowbt" + i);
    dtshowbt.css({
        "position": "absolute",
        "height": (dtbox.height() / 6) + "px",
        "width": (dtbox.height() / 6) + "px",
        "border-style": "none",
        "border-radius": "0 0 " + (dtbox.height() / 20) + "px " + (dtbox.height() / 20) + "px",
        "background": "rgba(185, 185, 185, 1.0)",
        "text-align": "center",
        "font-family": "微軟正黑體",
        "font-weight": "500",
        "font-size": (dtbox.height() / 6) + "px",
        "line-height": (dtbox.height() / 6) + "px",
        "color": "rgba(255, 255, 255, 1)",
        "right": "0px",
        "bottom": "10px",
    });

    var showed = false;
    dtshowbt.click(function () {
        if (!showed) {
            showed = true;
            showData(dtshowbt, dtbox, actid, dtsed, type, finish);
        } else {
            showed = false;
            closeData(dtshowbt, dtbox, actid, dtsed);
        }
    });

    var missionStr = (finish == "True") ? DataboxStr["finish" + language] : DataboxStr["training" + language];

    dtbox.append("<div id='dtmis" + i + "'>" + missionStr + "</div>");
    var dtmis = $("#dtmis" + i);
    dtmis.css({
        "position": "absolute",
        "height": (dtbox.height() / 3) + "px",
        "width": (dtbox.height() / 3) + "px",
        "right": "0px",
        "top": "0px",
        "text-align": "center",
        "font-size": (dtbox.height() / 8) + "px",
        "line-height": (dtbox.height() / 3) + "px",
        "font-family": "微軟正黑體",
        "font-weight": "800",
        "color": "#ff0000",
        "border-style": "solid",
        "border-width": (dtbox.height() / 30) + "px",
        "border-radius": "100%",
        "border-color": "#ff0000",
        "transform": "rotate(-10deg)",
        "background": "rgba(255, 255, 255, 0.4)",
    });

    dtmis.click(function () {
        if (finish == "False") {
            switch (parseInt(type)) {
                case 1:
                    Android.AlertDialog(DataboxStr["hospital" + language]);
                    break;
                case 4:
                    Android.training(actid, name, descr[0]);
                    break;
            }
        }
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