/*
 * Copyright Maxim Bykovskiy © 2019.
 */

/*
 * Copyright Maxim Bykovskiy © 2019.
 */

console.log("Hyper-script ext ready");

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.from === "popup") {
            var param = {};
            if (document.getElementById("intaro_crmbundle_ordertype_site")) {
                var n = document.getElementById("intaro_crmbundle_ordertype_site").options.selectedIndex;

                var storeName = document.getElementById("intaro_crmbundle_ordertype_site").options[n].text;
                var storeCode = document.getElementById("intaro_crmbundle_ordertype_site").value;

                console.log(storeName);

                param.storeName = storeName;
                param.storeCode = storeCode;
            }

            if (document.getElementById("intaro_crmbundle_ordertype_manager_chosen")) {
                var manager = document.getElementById("intaro_crmbundle_ordertype_manager_chosen").querySelectorAll('a > span')[0].outerText;

                console.log(manager);

                param.manager = manager;
            }

            if (document.getElementById("intaro_crmbundle_ordertype_firstName")) {
                var name = document.getElementById("intaro_crmbundle_ordertype_firstName").value;

                console.log(name);

                param.name = name;
            }

            if (document.getElementById("intaro_crmbundle_ordertype_lastName")) {
                var lname = document.getElementById("intaro_crmbundle_ordertype_lastName").value;

                if(lname !== '') {
                    console.log(lname);
                    if ('name' in param) {
                        param.name = name + " " + lname;
                    } else {
                        param.name = lname;
                    }
                }
            }

            if (document.getElementById("intaro_crmbundle_ordertype_phone")) {
                var phone = document.getElementById("intaro_crmbundle_ordertype_phone").value;

                console.log(phone);

                param.phone = phone;
            }

            if (document.getElementById("order-total-summ")) {
                var summ = document.getElementById("order-total-summ").querySelectorAll('span > span')[0].outerText;

                console.log(summ);

                param.summ = summ;
            }

            sendResponse(param);
        }
    });
