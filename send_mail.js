"use strict";
const nodemailer = require("nodemailer");
const fs = require('fs')
const actual_dir = __dirname;
const dir_to_read = '/certificados_react_update';

const html = `<div style="padding: 20px;">
              <h2 style="text-align: center;">Ayúdanos a mejorar</h2>
              <p style="text-align:justify:">Estimad@ participante de la comunidad React Bolivia</p>
              <p style="text-align:justify:">
              Ayuda a la comunidad React Bolivia a mejorar con tu opinión, si no llenaste nuestra
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSc9TlYkVRtwGzw87LfXfoMvh9GW7xZ32GuX4dqWbm8bguwCjg/viewform?usp=sf_link"> encuesta</a> todavía, ¡hazlo ahora! solo te tomará unos minutos,
              y tendrás la oportunidad de ayudar a la comunidad de React Bolivia a elaborar mejores eventos. <br>
              Anima a tus compañeros asistentes a llenarla también, será de gran ayuda.
              </p>

              <p>
              <b>Contactos</b> <br>

              <span style="font-size:11px;">Guillermo Paredes Torrez - (+591) 60684585</span>  <br>
              <span style="font-size:11px;">Pablo M. Jordan - (+591) 70162630               </span>  <br>
              <span style="font-size:11px;">Mauricio Mijail de la Quintana - (+591) 60101082</span>  <br>
              <span style="font-size:11px;">Arnol Robles Tintaya - (+591) 67341446          </span>  <br>
              <br>
              Atentamente <br>
              React Bolivia - Team Organizer <br>
              </p>
              </div>`;


function readDir(){
  const files = fs
                .readdirSync(actual_dir + dir_to_read)
                .map(e => {
                  let splitted = e.split(' ');
                  return {email: splitted[0], pdf: e} ;
                });
  return files;
}

async function main(){
  try{
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      tls: true,
      auth: {
        user: 'comunity.react.bolivia@gmail.com',
        pass: 'reactbolivia.gmail'
      }
    });

    // setup email data with unicode symbols
    let emails = readDir().map(e => e.email.toLowerCase());
    let mailOptions = {
      from: '"React Bolivia" <comunity.react.bolivia@gmail.com>', // sender address
      to: emails.join(', '), // list of receivers
      subject: "REACT BOLIVIA - AYÚDANOS A MEJORAR", // Subject line
      html: html // html body
    };
    let sent = 0;
    // readDir()
    //   .map(async (e) => {
    //     try{
    //       // mailOptions['to'] = e.email;
    //       let info = await transporter.sendMail(mailOptions);
    //       let time = new Date();
    //       // send mail with defined transport object
    //       console.log(`[${time}]  Message sent: ${info.messageId}`);
    //       // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    //       sent++;
    //     }catch(e){
    //       console.log(`--- No se envio el correo a: ${e.email}`)
    //       console.log(e);
    //     }
    //   });
    let info = await transporter.sendMail(mailOptions);
    let time = new Date();
    console.log(`[${time}]  Message sent: ${info.messageId}`);

    let now = new Date();
    console.log('################################')
    console.log(`[${now}]:: Se enviaron ${sent} correos 💪`);
    console.log('################################')
    return;
  }catch(e){
    console.log('El correo electrónico no fue enviado debido a un error:');
    console.log(e);
  }
}
// readDir();
main();
