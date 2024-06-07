function getInternalUrl(url) {
    var internalUrl = url;
    if (!!window.env && window.env == "SANDBOX") {
        console.log(window.env)
        var splittedUrl = url.split('&compid');
        console.log("Splitting URL" + splittedUrl)
        if (splittedUrl.length > 0) {
            internalUrl = splittedUrl[0];
        }

    }
    return internalUrl;
}

function getRequest(url, obj) {
    var result = '';
    jQuery.ajax({
        url: getInternalUrl(url),
        type: "get",
        data: obj,
        async: false,
        success: function (data) {
            result = data;
            ////console.log('result',result);
        },
        error: function (e) {
            // jQuery('#errModal').show();
            // jQuery('#errMsg').html(e);
            alert('Error')
        }
    });

    return result;
}

function openCity(evt, cityName) {
    var i,
        tabcontent,
        tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
jQuery(document).ready(function () {

    var obj = {};
    var url = "https://8760954.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=1669&deploy=1&compid=8760954&ns-at=AAEJ7tMQ_VeJzTk5QeghEMsIjWmUjbX6DAigINkCxu0rCpxa_dM";
    var result = getRequest(url, obj);
    var addResults1 = JSON.parse(result);
    console.log('addResults1', addResults1);
    var addResults = addResults1.vmDataResults;
    var bucketData = addResults1.bucketDatat;
    var deliveryData = addResults1.deliverydata;

    inventoryTab(addResults, bucketData);
    DeliveryTab(deliveryData);

});
function DeliveryTab(deliveryData) {

    var htmltable = "<table id='delivery' class='table table-striped table-fixed'>";
    debugger;
    htmltable += getDeliveryHeader();
    for (var m = 0; m < deliveryData.length; m++) {
        if (deliveryData[m] != null && deliveryData[m] != undefined) {

            htmltable += getDeliveryTableRow(
                deliveryData[m].deliverylocation,
                deliveryData[m].deliverycustomer,
                deliveryData[m].deliverysalesrep,
                deliveryData[m].deliveryDate,
                deliveryData[m].deliveryclosedeal,
                deliveryData[m].deliveryinsurance,
                deliveryData[m].depcleardelivery,
                deliveryData[m].deliveryVin,
                deliveryData[m].deliverytruckready,
                deliveryData[m].deliveryWashed,
                deliveryData[m].deliverytotlease,
                deliveryData[m].deliverydeposit,
                deliveryData[m].deliverypupayment,
                deliveryData[m].deliverybalance,
                deliveryData[m].deliverymcoo,
                deliveryData[m].deliverymsalesquote,
                deliveryData[m].deliverycontract,
                deliveryData[m].deliverynotes,
                deliveryData[m].deliveryexception,
                deliveryData[m].deliverydepolink,
                deliveryData[m].deliverydepotext)
        }
    }
    htmltable += '</tbody>'
    htmltable += '</table>';
    jQuery('#menu1').html(htmltable);

}
function inventoryTab(addResults, bucketData) {
    var lineNum = 0;
    var htmltable = '<input id="myInput" type="text" placeholder="Search..">'
    htmltable += "<table id='inventory' class='table table-fixed'>";
    debugger;
    htmltable += gethtmlHeader();
    for (var m = 0; m < addResults.length; m++) {
        if (addResults[m] != null && addResults[m] != undefined) {

            var vinid = addResults[m].id;
            var vinName = addResults[m].vinName;
            var model = addResults[m].modelid;
            var brand = addResults[m].brand;
            var locid = addResults[m].locid;
            var modelyr = addResults[m].modelyr;
            var bucketId = addResults[m].bucketId;
            var stockdt = addResults[m].stockdt;
            var Statusdtval = addResults[m].Statusdtval;
            var Statusdt = addResults[m].Statusdt;
            var Mileagedt = addResults[m].Mileagedt;
            var Transdt = addResults[m].Transdt;
            var Enginedt = addResults[m].Enginedt;
            var Customerdt = addResults[m].Customerdt;
            var salesrepdt = addResults[m].salesrepdt;
            var extclrdt = addResults[m].extclrdt;
            var DateTruckRdydt = addResults[m].DateTruckRdydt;
            var DateTruckLockupdt = addResults[m].DateTruckLockupdt;
            var DateTruckAgingdt = addResults[m].DateTruckAgingdt;
            var DateOnsitedt = addResults[m].DateOnsitedt;
            var invdepositLink = addResults[m].invdepositLink;
            var InvSales = addResults[m].InvSales;

            if (InvSales) {
                salesrepdt = InvSales;
            }



            var datagrouped = _.groupBy(bucketData,'bucketIdText');
            if (true) {
                var lengthBuck = Object.keys(datagrouped);
                for (var k = 0; k < lengthBuck.length; k++) {
                    var singlebucket = datagrouped[lengthBuck[k]];
                    console.log('bucketId'+bucketId,'singlebucket'+singlebucket);
                    if(singlebucket[0].bucketId = bucketId){
                        for(var j=0;j<singlebucket.length;j++){
                            var bktId 		= singlebucket[j]["id"];
                            var bktText 		= singlebucket[j]["bucketIdText"];
                            var DEPINSP 	= singlebucket[j]["DEPINSP"] * 1;
                            var PAYINSP 	= singlebucket[j]["PAYINSP"] * 1;
                            var TTLINSP 	= singlebucket[j]["TTLINSP"] * 1;
                            var TERMS 		= singlebucket[j]["TRMS"] * 1;
                            var sec_2_13 	= singlebucket[j]["twotothirteen"] * 1;
                            var sec_14_26 	= singlebucket[j]["forteentotwentysix"] * 1;
                            var sec_26_37 	= singlebucket[j]["twosixtothreenseven"] * 1;
                            var sec_38_49 	= singlebucket[j]["threeeighttoforunine"] * 1;
                            var purOptn 	= singlebucket[j]["purOptn"] * 1;
                            var contTot 	= singlebucket[j]["conttot"] * 1;
                            var freq 		= singlebucket[j]["freq"];
                            var saleCh 		= singlebucket[j]["saleCh"];
                            var bucketchildname 		= singlebucket[j]["bucketchildname"];
                            htmltable += getTableRow(stockdt, Statusdtval,Statusdt, modelyr, Mileagedt, extclrdt, vinName, locid, brand, Transdt, Enginedt, Customerdt, salesrepdt, DateTruckRdydt, DateTruckLockupdt, DateTruckAgingdt, DateOnsitedt, bktText,DEPINSP, PAYINSP, TTLINSP, TERMS,sec_2_13
                                ,sec_14_26,sec_26_37,sec_38_49,purOptn,contTot,freq,saleCh,model,bucketchildname
                            )
                            //console.log('singlebucket',singlebucket);
                            //break;
                        }
                    }

                    break;
                }
            }
        }
    }
    htmltable += '</tbody>'
    htmltable += '</table>';
    jQuery('#home').html(htmltable);
}
function gethtmlHeader() {
    var html = "<thead>";
    html += "      <tr>";
    html += "        <th>Stock#</th>";
    html += "        <th>Status</th>";
    html += "        <th>Model Year</th>";
    html += "        <th>Mileage</th>";
    html += "        <th>Color</th>";
    html += "        <th>Vin#</th>";
    html += "        <th>Location</th>";
    html += "        <th>Make</th>";
    html += "        <th>Transmission</th>";
    html += "        <th>Engine</th>";
    html += "        <th>Customer</th>";
    html += "        <th>Salesrep</th>";
    html += "        <th>Date Truck Ready</th>";
    html += "        <th>Date Truck LockedUP</th>";
    html += "        <th>Aging</th>";
    html += "        <th>Date On Site</th>";
    html += "        <th>Deposit Inception</th>";
    html += "        <th>Payment Inception</th>";
    html += "        <th>Total Inception</th>";
    html += "        <th>Terms</th>";
    html += "        <th>Payments 2-13</th>";
    html += "        <th>Payments 14-25</th>";
    html += "        <th>Payments 26-37</th>";
    html += "        <th>Payments 38-49</th>";
    html += "        <th>Purchase Option</th>";
    html += "        <th>Contract Total</th>";
    html += "        <th>Model</th>";
    html += "        <th>Frequency</th>";
    html += "        <th>Bucket ID</th>";
    html += "        <th>Bucket Child</th>";
    html += "      </tr>";
    html += "    </thead>";
    html += "    <tbody>";

    return html;
}
function getTableRow(stock,Statusdtval, status, modelyear, Mileage, color, vin, location, make, Transmission, engine, customer, salesrep, dtr, dtl, aging, dos,bktText, di, pi, ti, terms,sec_2_13
    ,sec_14_26,sec_26_37,sec_38_49,purOptn,contTot,freq,saleCh,model,bucketchildname) {

    var html = getcolortr(Statusdtval)

    html += "        <td>" + stock + "</td>";
    html += "        <td>" + status + "</td>";
    html += "        <td>" + modelyear + "</td>";
    html += "        <td>" + Mileage + "</td>";
    html += "        <td>" + color + "</td>";
    html += "        <td>" + vin + "</td>";
    html += "        <td>" + location + "</td>";
    html += "        <td>" + make + "</td>";
    html += "        <td>" + Transmission + "</td>";
    html += "        <td>" + engine + "</td>";
    html += "        <td>" + customer + "</td>";
    html += "        <td>" + salesrep + "</td>";
    html += "        <td>" + dtr + "</td>";
    html += "        <td>" + dtl + "</td>";
    html += "        <td>" + aging + "</td>";
    html += "        <td>" + dos + "</td>";
    html += "        <td>" + di + "</td>";
    html += "        <td>" + pi + "</td>";
    html += "        <td>" + ti + "</td>";
    html += "        <td>" + terms + "</td>";
    html += "        <td>" + sec_2_13 + "</td>";
    html += "        <td>" + sec_14_26 + "</td>";
    html += "        <td>" + sec_26_37 + "</td>";
    html += "        <td>" + sec_38_49 + "</td>";
    html += "        <td>" + purOptn + "</td>";
    html += "        <td>" + contTot + "</td>";
    html += "        <td>" + model + "</td>";
    html += "        <td>" + freq + "</td>";
    html += "        <td>" + bktText + "</td>";
    html += "        <td>" + bucketchildname + "</td>";
    html += "  </tr> ";

    return html;

}

function getDeliveryHeader() {

    var html = "<thead>";
    html += "      <tr>";
    html += "        <th>Location</th>";
    html += "        <th>Name</th>";
    html += "        <th>Salesrep</th>";
    html += "        <th>ETA</th>";
    html += "        <th>Days to close deal</th>";
    html += "        <th>Insurance Application</th>";
    html += "        <th>Cleared For Delivery</th>";
    html += "        <th>VIN</th>";
    html += "        <th>Truck Ready</th>";
    html += "        <th>Washed</th>";
    html += "        <th>Total Lease Inception</th>";
    html += "        <th>Deposit</th>";
    html += "        <th>P/U payment</th>";
    html += "        <th>Balance</th>";
    html += "        <th>MC/oo</th>";
    html += "        <th>Sales Quote</th>";
    html += "        <th>Contract</th>";
    html += "        <th>Notes</th>";
    html += "        <th>Exceptions</th>";
    html += "        <th>Deposit</th>";
    html += "      </tr>";
    html += "    </thead>";
    html += "    <tbody>";

    return html;

}

function getDeliveryTableRow(
    deliverylocation,
    deliverycustomer,
    deliverysalesrep,
    deliveryDate,
    deliveryclosedeal,
    deliveryinsurance,
    depcleardelivery,
    deliveryVin,
    deliverytruckready,
    deliveryWashed,
    deliverytotlease,
    deliverydeposit,
    deliverypupayment,
    deliverybalance,
    deliverymcoo,
    deliverymsalesquote,
    deliverycontract,
    deliverynotes,
    deliveryexception,
    deliverydepolink,
    deliverydepotext) {
    var deliveryWashed1 = deliveryWashed ? 'Yes' : 'No'
    var deliverymsalesquote1 = deliverymsalesquote ? 'Yes' : 'No'
    var deliverytruckready1 = deliverytruckready ? 'Yes' : 'No'
    var html = "<tr>";
    html += "        <td>" + deliverylocation + "</td>";
    html += "        <td>" + deliverycustomer + "</td>";
    html += "        <td>" + deliverysalesrep + "</td>";
    html += "        <td>" + deliveryDate + "</td>";
    html += "        <td>" + deliveryclosedeal + "</td>";
    html += "        <td>" + deliveryinsurance + "</td>";
    html += "        <td>" + depcleardelivery + "</td>";
    html += "        <td>" + deliveryVin + "</td>";
    html += "        <td>" + deliverytruckready1 + "</td>";
    html += "        <td>" + deliveryWashed1 + "</td>";
    html += "        <td>" + deliverytotlease + "</td>";
    html += "        <td>" + deliverydeposit + "</td>";
    html += "        <td>" + deliverypupayment + "</td>";
    html += "        <td>" + deliverybalance + "</td>";
    html += "        <td>" + deliverymcoo + "</td>";
    html += "        <td>" + deliverymsalesquote1 + "</td>";
    html += "        <td>" + deliverycontract + "</td>";
    html += "        <td>" + deliverynotes + "</td>";
    html += "        <td>" + deliveryexception + "</td>";
    // html +="        <td>"+deliverydepolink+"</td>";
    html += "        <td>" + deliverydepotext + "</td>";
    html += "  </tr> ";

    return html;

}

jQuery(document).ready(function () {

    $("#myInput").on("keyup", function () {
        debugger;
        var value = $(this).val().toLowerCase();
        $("#inventory tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

function colorsForInventory()
{
    var obj={};
    obj.BackGroundColEnroute = "#0000FF";
    obj.BackGroundColInShop = "#FFA500";
    obj.BackGroundColHold = "#FF0000";
    obj.BackGroundColOnSite = "grey";
    obj.BackGroundColReady = "#008000";
    obj.BackGroundColSRD = "#8B8000";

    obj.TextCol   = "#000000";
    obj.TextColNeedassmnt = "#FFFFFF"
    obj.TextColredem = "#000000"
    return obj;
}

function getcolortr(Statusdtval)
{
    var obj = colorsForInventory();
    var status = Statusdtval;
    var html="<tr>";
    /* if(Statusdtval==22)
   {
        html = "<tr style='background-color:"+obj.BackGroundColEnroute+" '>";
   } */
    if(status==22){
        html = "<tr style='color:"+obj.BackGroundColEnroute+" ;font-weight:bold !important;'>";
        //applycolor(obj.BackGroundColEnroute,obj.TextColNeedassmnt,L,sublist);
    }
    else if(status==20){
        html = "<tr style='color:"+obj.BackGroundColInShop+" ;font-weight:bold !important;'>";
        //applycolor(obj.BackGroundColInShop,obj.TextColNeedassmnt,L,sublist);
    } else if(status==23){
        html = "<tr style='color:"+obj.BackGroundColHold+" ;font-weight:bold !important;'>";
        //applycolor(obj.BackGroundColHold,obj.TextColredem,L,sublist);
    } else if(status==21 ){
        html = "<tr style='color:"+obj.BackGroundColOnSite+" ;font-weight:bold !important;'>";
        //applycolor(obj.BackGroundColOnSite,obj.TextColredem,L,sublist);
    }else if(status==19){
        html = "<tr style='color:"+obj.BackGroundColReady+" ;font-weight:bold !important;'>";
        //applycolor(obj.BackGroundColReady,obj.TextColNeedassmnt,L,sublist);
    }else if(status==24){
        html = "<tr style='color:"+obj.BackGroundColSRD+" ;font-weight:bold !important;'>";
        //applycolor(obj.BackGroundColSRD,obj.TextColNeedassmnt,L,sublist);
    }
    return html;
}