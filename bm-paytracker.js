/* Javascript Library for the BlockMagic Payment Tracker application
(c) Monty Dimkpa, 2018
ver: 0.5
*/ 

var payment_tracks = new Object();

payment_tracks["utility"] = new Object();
// modify and add other payment tracks as required

payment_tracks["utility"]["api_key"] = `7f2f09dafb3fa9f7c3c22377ad76203c`;
// modify and set valid API keys for other tracks as required

payment_tracks["utility"]["global_payee"] = `Acme Systems Limited`;
// modify and set a global payee for other tracks as required

var base_urls = new Object();

base_urls["push_receipt"] = `http://api.click-meter.com:5000/payment-tracker/push-receipt/`;
base_urls["payment_summary"] = `http://api.click-meter.com:5000/payment-tracker/payment-summary/`;

function push_receipt(from,amount,track){
	var data = new Object();
	data["from"] = from.toLowerCase();
	data["to"] = payment_tracks[track].global_payee.toLowerCase();
	data["amount"] = amount;
	data["key"] = payment_tracks[track].api_key;

	var suffix = JSON.stringify(data);
	var push_url = base_urls.push_receipt+suffix;
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", push_url, false );
    xmlHttp.send( null );
    alert(xmlHttp.responseText);
 }

function query_payments(track,from_date,to_date){
	var data = new Object();

	data["payer"] = `*`;
	data["payee"] = `*`;
	data["from_date"] = from_date;
	data["to_date"] = to_date;
	data["key"] = payment_tracks[track].api_key;

	var suffix = JSON.stringify(data);
	var query_url = base_urls.payment_summary+suffix;
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", query_url, false );
    xmlHttp.send( null );
    // get JSON data
    var data = JSON.parse(xmlHttp.responseText);
    // parse html
    var total = data.total;
    var events = data.events;
    var html = `<tr><th>Date</th><th>From</th><th>To</th><th>Amount</th><th>Total</th></tr>`;
    events.forEach((event)=>{
    	if(events.indexOf(event)==0){
    		html+=`<tr><td>`+event.date+`</td><td>`+event.from+`</td><td>`+event.to+`</td><td>`+event.amount+`</td><td>`+total.toString()+`</td></tr>`;
    	}else{
    		html+=`<tr><td>`+event.date+`</td><td>`+event.from+`</td><td>`+event.to+`</td><td>`+event.amount+`</td><td></td></tr>`;
    	}
    });
    // embed in div
    $("#bm-paytracker-table").html(html)

 }
