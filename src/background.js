/*
 * Copyright Maxim Bykovskiy © 2019.
 */

function buildUrl(url, parameters){
    var qs = "";
    for(var key in parameters) {
        var value = parameters[key];
        qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
    }
    if (qs.length > 0){
        qs = qs.substring(0, qs.length-1); //chop off last "&"
        url = url + "?" + qs;
    }
    return url;
}

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {from: "popup"}, function(response) {
            console.log("Request data");
            console.log(response);
            // var store = 0;
            //
            // if ('storeName' in response) {
            //     store = response.storeName;
            // }

            chrome.windows.getAll({populate : true,  windowTypes: ['popup']}, function (window_list) {
                var num = window_list.length;
                var windowId = 0;
                for(var i=0;i<window_list.length;i++) {
                    console.log(window_list[i].tabs[0]);
                    if(window_list[i].tabs[0].title === "HyperScript") {
                        var isAdmin = confirm("Подтверждаете закрытие уже открытого виджета?");

                        if (isAdmin) {
                            chrome.windows.remove(window_list[i].tabs[0].windowId);
                            num--;
                        }

                        windowId = window_list[i].tabs[0].windowId;
                    }
                }

                if(num === 0) {
                    var query = buildUrl('http://script.mcdir.ru/scripts/hyperscript/popup.php', response);

                    console.log(query);

                    var options = {
                        url: query,
                        type: 'popup',
                        width: 550,
                        height: 550,
                        focused: true
                    };

                    var v = chrome.windows.create(options);
                } else {
                    chrome.windows.update(windowId, {focused: true});
                }
            });
        });
    });
});