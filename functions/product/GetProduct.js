import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamoDb";
const table=process.env.tableProducts;

//Funcao responsavel por retornar um unico produto a partir do seu Id
export const main = handler( async (event, context) => {
    const reqBody = JSON.parse(event.body);
    const parametros={
        TableName: table,
        KeyConditionExpression: "productId = :productId",
        ExpressionAttributeValues: {
            ":productId": reqBody.id
        }
    };
    const result = await dynamoDb.query(parametros);
    if ( ! result.Items) {
        throw new Error("Não há compras.");
      }
    return result.Items;
});