import handler from "../../libs/handler-lib";
// import nodemailer from 'nodemailer';
import nodemailer from 'nodemailer';

//funcao para enviar email apos a compra
export const main = handler(async (event, context) => {
    const sucessSend = {
        message: ''
    };
    //adciona as informações de email e senha
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bgcjoaoluz@gmail.com',
            pass: 'bgc@joao123'
        }
      });
    // envia o emai utilizndo o objeto transporter criado
    let info = await transporter.sendMail({
    from: '"Meu Minion Favorito 👻" <bgcjoaoluz@gmail.com>', // sender address
    to: "jovictor47@gmail.com, thiago@bgcbrasil.com.br", // list of receivers
    subject: "Nova reserva ✔", // Subject line
    text: "Nova reserva realizada no e-commerce", // plain text body
    html: "<h1>Nova reserva!</h1><br><b>Nova realizada no e-commerce!</b>", // html body
  });
    if (!info.messageId) {
        sucessSend.message = 'Não conseguimos fazer a reserva!';
    } else {
        sucessSend.message = 'Reservado com sucesso!';
    }
    return sucessSend.message;
});