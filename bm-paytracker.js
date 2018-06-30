// Javascript Library for the BlockMagic Payment Tracker application

var httpdata;
var base_urls = new Object();

base_urls["new_account"] = `http://api.click-meter.com:5000/payment-tracker/create-account`;
base_urls["push_receipt"] = `http://api.click-meter.com:5000/payment-tracker/push-receipt/`;
base_urls["payment_summary"] = `http://api.click-meter.com:5000/payment-tracker/payment-summary/`;


// for Node test only
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;   


const xhr = new XMLHttpRequest();

xhr.addEventListener("load", () => {
    const data = JSON.parse(xhr.responseText);
    console.log(data);
	});

xhr.open("GET", base_urls.new_account);
xhr.send();











