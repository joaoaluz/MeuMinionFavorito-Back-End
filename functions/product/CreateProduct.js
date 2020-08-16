import * as uuid from "uuid";
import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamoDb";
const table=process.env.tableProducts;
//função de retorno com objeto da requisicao
//criar novo produto Minion
export const main = handler(async (event, context) => {
    // Retorno json da chamda da funcao
    const reqBody = JSON.parse(event.body);
    // Construindo os parametros para criacao de novo produto
    // Passando o nome da tabela e os valores para criação
    const parametros = {
        TableName: table,
        Item: {
            productId : uuid.v1(),
            createAt: new Date().toISOString(),
            userId:reqBody.userId,
            productName: reqBody.productName,
            productDescription: reqBody.productDescription,
            productValue: reqBody.productValue,
            productImage: reqBody.productImage
        }
    };
    await dynamoDb.put(parametros);
    return parametros.Item;
});