/* Javascript Library for the BlockMagic Payment Tracker application
(c) Monty Dimkpa, 2018
ver: 0.5
*/ 

var httpdata;  // global message variable

var payment_tracks = new Object();

payment_tracks["utility"] = new Object();
// add other payment tracks as required

payment_tracks["utility"]["api_key"] = `47d7c7aec7471f59626b1423915bd3d8`;
// set valid API keys for other tracks as required

payment_tracks["utility"]["global_payee"] = `Acme Systems Limited`;
// set a global payee for other tracks as required


var base_urls = new Object();

base_urls["push_receipt"] = `http://api.click-meter.com:5000/payment-tracker/push-receipt/`;
base_urls["payment_summary"] = `http://api.click-meter.com:5000/payment-tracker/payment-summary/`;



function process_push(push_url){
		const xhr = new XMLHttpRequest();
		xhr.addEventListener("load", () => {});
		xhr.open("GET", push_url);
		xhr.send();
}


function process_query(query_url){
		const xhr = new XMLHttpRequest();
		xhr.addEventListener("load", () => {
			httpdata=JSON.parse(xhr.responseText);
		});
		xhr.open("GET", query_url);
		xhr.send();
}


function push_receipt(from,amount,track){

	var data = new Object();

	data["from"] = from.toLowerCase();
	data["to"] = payment_tracks[track].global_payee.toLowerCase();
	data["amount"] = amount;
	data["key"] = payment_tracks[track].api_key;

	var suffix = JSON.stringify(data);
	var push_url = base_urls.push_receipt+suffix;

	process_push(push_url);  // no need to evaluate, will succeed

}


function query_payments(from,track,from_date,to_date){

	var data = new Object();

	data["payer"] = from.toLowerCase();
	data["payee"] = payment_tracks[track].global_payee.toLowerCase();
	data["from_date"] = from_date;
	data["to_date"] = to_date;
	data["key"] = payment_tracks[track].api_key;

	var suffix = JSON.stringify(data);
	var query_url = base_urls.payment_summary+suffix;
	
	process_query(query_url);  // will refresh httpdata, wait some then evaluate
}
















