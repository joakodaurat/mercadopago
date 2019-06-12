const express = require('express');
const morgan = require('morgan');
var mercadopago = require('mercadopago');

const app = express();
//configuraciones 
app.set('port', process.env.PORT || 3000)

//middlewares
app.use(morgan('dev'))
app.use(express.json());

// configuracion de mercado pago
mercadopago.configure({
    client_id: '2208667099065897',
    client_secret: 'D1OKwI3lMyrYfH19CuL6iRAaFBAp8gW2'
   //sandbox: true,
   // access_token: 'TEST-2208667099065897-051415-be4db4bd9b12c1be79ecde11b054ae60-435877162'
  });

//hardcodeo lo que tendria que venir en el post
var preference = {
    items: [
      {
        id: '1234',
        title: 'tabla para kitesurf',
        quantity: 1,
        currency_id: 'ARS',
        unit_price: 1000
      }
    ],
    payer:{
      name: "marino",
      surname: "bonnoti",
      email: "joaquin.daurat@gmail.com",
      date_created: "2015-06-02T12:58:41.425-04:00",
      phone: {
        area_code:"234",
        number: 1212
      },
      identification: {
        type: "DNI",
        number: "12345678"
      },
      address: {
        street_name: "Rincón Rosalia Prieto",
        street_number: 1324,
        zip_code: "37190"
      }
    },
    shipments : {
        mode: "me2",
        dimensions: "30x30x30,500",
          receiver_address: {
              
          }}
  };


  app.post("/pagar",function(req,res){
    if(preference){



   // creo la referencia a mercado pago
   mercadopago.preferences.create(preference)
   .then(function (p) {
     
  //  console.log(p);
     mandar(p);
     // Do something if preference has been created successfull
     
   }).catch(function (error) {
    // If an error has occurred
     console.log(error);
   });
  }else {
    res.redirect("/");}
  
    function mandar(p){
        console.log(p);
        res.send(p);



};
  });



app.listen(app.get('port'), () =>{
    console.log('servidor en el puerto 3000')
});