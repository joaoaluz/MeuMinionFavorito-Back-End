import * as uuid from "uuid";
import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamoDb";
import nodemailer from 'nodemailer';

//Cria uma nova compra e envia o email de compra
const table=process.env.tablePurchases;
//funcao de retorno com objeto da requisicao
//criar novo produto Minion
export const main = handler(async (event, context) => {
    const sucessSend = {
        message: ''
    };
    // Retorno json da chamda da funcao
    const reqBody = JSON.parse(event.body);
    // Construindo os parametros para criacao de novo produto
    // Passando o nome da tabela e os valores para criação
    const parametros = {
        TableName: table,
        Item: {
            purchaseId : uuid.v1(),
            createAt: new Date().toISOString(),
            client:reqBody.client,
            purchaseProduct: reqBody.purchaseProduct,
            purchaseValue: reqBody.purchaseValue,
        }
    };
    //mandar email com nova compra
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bgcjoaoluz@gmail.com',
            pass: 'bgc@joao123' // naturally, replace both with your real credentials or an application-specific password
        }
      });
    // send mail with defined transport object
    let info = await transporter.sendMail({
    from: '"Meu Minion Favorito 👻" <bgcjoaoluz@gmail.com>', // sender address
    to: "jovictor47@gmail.com", // list of receivers
    subject: "Nova reserva ✔", // Subject line
    text: "Nova reserva realizada no e-commerce", // plain text body
    html: "<h1>Nova reserva!</h1><br><b> <br>Produto:"+ parametros.Item.purchaseProduct + "<br> Email do Cliente:"+ parametros.Item.client + "<br>" +"<br> Valor:"+ parametros.Item.purchaseValue + "<br></b>", // html body
    });
    if (!info.messageId) {
        sucessSend.message = 'nao enviou';
    } else {
        sucessSend.message = 'Enviado com sucesso';
    }
    await dynamoDb.put(parametros);
    return sucessSend.message;
});