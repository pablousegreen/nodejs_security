const express = require('express');
const cors = require('cors');
const router = express();
const Openpay = require("openpay");
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
const encode = require('base-64');

router.use(cors());

let merchant_id_d = "mwfxtxcoom7dh47pcds1";
let headers = {'headers': {
    'Authorization': 'Basic ' + 'c2tfZDVhOTBhODNlZTc4NDgzODkwMjg2ZTJkZmI2MWRkMzU6',
    'Content-Type': 'application/json'
  }
}

router.post("/getToken", (req, res) => {
  console.log("card_number: ", req.body.card_number);
  console.log("holder_name: ", req.body.holder_name);
  console.log("expiration_year: ", req.body.expiration_year);
  console.log("expiration_month: ", req.body.expiration_month);
  console.log("cvv2: ", req.body.cvv2);
  console.log("address: ", req.body.address);

  return res.status(200).json({message: 'result'});
});

router.post("/cards", async (req, res) => {
  const merchant_id_d = req.headers.merchant_id_d;
  if(!merchant_id_d){
    console.log('Missing merchant_id_d ');
    res.status(401).json({message: 'merchant_id_d Forgotten'})
  }
  const url = `https://sandbox-api.openpay.mx/v1/${merchant_id_d}/cards`;
  const body = req.body;
  if(!body){
    console.log('Missing body ');
    res.status(401).json({message: 'body Forgotten'})
  }

  const data = JSON.stringify(
    body
  );
  await fetch(url, {
        'method': 'POST',
        'body':    data,
        'headers': {
          'Authorization': 'Basic ' + 'c2tfZDVhOTBhODNlZTc4NDgzODkwMjg2ZTJkZmI2MWRkMzU6',
          'Content-Type': 'application/json'
        }
    })
    .then(result => {
      return result.json();
    })
    .then(json => {
      console.log(json);
      console.log('------------');
      return res.status(200).json({message: json});
    })
    .catch(error =>{
      return res.status(400).json({message: error});
    });
});


router.get("/cardsbyid", async (req, res) => {
  const card_id = req.headers.card_id;//'kxtaatsqh0rktjdoft08';
  const merchant_id_d = req.headers.merchant_id_d;//"mwfxtxcoom7dh47pcds1";
  const url = `https://sandbox-api.openpay.mx/v1/${merchant_id_d}/cards/${card_id}`;

  if(!card_id){
    console.log('Missing card_id ');
    res.status(401).json({message: 'card_id Forgotten'})
  }

  if(!merchant_id_d){
    console.log('Missing merchant_id_d ');
    res.status(401).json({message: 'merchant_id_d Forgotten'})
  }

  await fetch(url, {
        'method': 'GET',
        'headers': {
          'Authorization': 'Basic ' + 'c2tfZDVhOTBhODNlZTc4NDgzODkwMjg2ZTJkZmI2MWRkMzU6',
          'Content-Type': 'application/json'
        }
    })
    .then(result => {
      return result.json();
    })
    .then(json => {
      //console.log(`json: ${res.json()}`);
      console.log(json);
      console.log('------------');
      return res.status(200).json({message: json});
    })
    .catch(error =>{
      return res.status(400).json({message: error});
    });
});


//https://sandbox-api.openpay.mx/v1/mwfxtxcoom7dh47pcds1/tokens
router.post("/tokens", async (req, res) => {
  const merchant_id_d = "mwfxtxcoom7dh47pcds1";
  const url = `https://sandbox-api.openpay.mx/v1/${merchant_id_d}/tokens`;
  const body = {
    "device_session_id" : "kR1MiQhz2otdIuUlQkbEyitIqVMiI16f",
    "holder_name": "Tokenización cargo directo",
    "card_number": "4242424242424242",
    "cvv2": "842",
    "expiration_month": "09",
    "expiration_year": "29",
    "address": {
      "line1":"Av 5 de Febrero",
      "line2":"Roble 207",
      "line3":"col carrillo",
      "state":"Queretaro",
      "city":"Querétaro",
      "postal_code":"76900",
      "country_code":"MX"
    }
  };

  const data = JSON.stringify(
    body
  );
  await fetch(url, {
        'method': 'POST',
        'body':    data,
        'headers': {
          'Authorization': 'Basic ' + 'c2tfZDVhOTBhODNlZTc4NDgzODkwMjg2ZTJkZmI2MWRkMzU6',
          'Content-Type': 'application/json'
        }
    })
    .then(result => {
      return result.json();
    })
    .then(json => {
      //console.log(`json: ${res.json()}`);
      console.log(json);
      console.log('------------');
      return res.status(200).json({message: json});
    })
    .catch(error =>{
      return res.status(400).json({message: error});
    });
});


router.get("/zamato", async (req, res) => {
  const categoryURL = `https://developers.zomato.com/api/v2.1/categories`;
  const appi = "db6e99e17b715df63cb77051df4ce9af";
  const header = {
      method: "GET",
      headers: {
          "user-key": appi,
          "Content-Type": "application/json"
      },
      credentials: "same-origin"
  };
   await fetch(categoryURL, header)
   .then( function(result) {
      return result.json();
    })
    .then( json => {
      //console.log(`json: ${res.json()}`);
      console.log(json);
      //console.log(JSON.stringify(result));
      console.log('------------');
      return res.status(200).json({message: json});
    })
    .catch(error =>{
      console.log(error);
      return res.status(400).json({message: error});
    });
});




/***********OPENPAY TEST******** */

router.post("/create_customer", (req, res) => {
  let newCustomer = req.body;
  console.log("WELL see new Customer: ", newCustomer);
  if (newCustomer === null) {
    res.status(450).send("Customer Null");
  }
  //instantiation
  var openpay = new Openpay(
    "mivwslqokin62ozwknpf",
    "sk_1bffa42ba7224a25ba1a72cc80c35d43"
  );
  openpay.setProductionReady(false);
  openpay.customers.create(newCustomer, function (error, body) {
    if (error !== null) {
      res.status(455).send(error);
    } // null if no error occurred (status code != 200||201||204)
    res.status(200).send(body); // contains the object returned if no error occurred (status code == 200||201||204)
  });
});

router.post("/new_charge", (req, res) => {
  let newCharge = req.body;
  console.log("WELL see new newCharge: ", newCharge);
  if (newCharge === null) {
    res.status(450).send("Charge Null");
  }
  //instantiation
  var openpay = new Openpay(
    "mivwslqokin62ozwknpf",
    "sk_1bffa42ba7224a25ba1a72cc80c35d43"
  );
  openpay.setProductionReady(false);
  openpay.charges.create(newCharge, function (error, body) {
    if (error !== null) {
      res.status(455).send(error);
    } // null if no error occurred (status code != 200||201||204)
    res.status(200).send(body); // contains the object returned if no error occurred (status code == 200||201||204)
  });
});

router.post("/payout", (req, res) => {
  let payout = req.body;
  console.log("WELL see new payout: ", payout);
  if (payout === null) {
    res.status(450).send("payout Null");
  }
  //instantiation
  var openpay = new Openpay(
    "mivwslqokin62ozwknpf",
    "sk_1bffa42ba7224a25ba1a72cc80c35d43"
  );
  openpay.setProductionReady(false);
  openpay.payouts.create(payout, function (error, body) {
    if (error !== null) {
      res.status(455).send(error);
    } // null if no error occurred (status code != 200||201||204)
    res.status(200).send(body); // contains the object returned if no error occurred (status code == 200||201||204)
  });
});

router.post("/webhooks", (req, res) => {
  let webhook_params = req.body;
  console.log("WELL see new webhooks: ", webhook_params);
  if (webhook_params === null) {
    res.status(450).send("webhooks Null");
  }
  //instantiation
  var openpay = new Openpay(
    "mivwslqokin62ozwknpf",
    "sk_1bffa42ba7224a25ba1a72cc80c35d43"
  );
  openpay.setProductionReady(false);
  openpay.webhooks.create(webhook_params, function (error, body, response) {
    if (error !== null) {
      res.status(455).send(error);
    } // null if no error occurred (status code != 200||201||204)
    res.status(200).send(body); // contains the object returned if no error occurred (status code == 200||201||204)
  });
});

module.exports = router;
