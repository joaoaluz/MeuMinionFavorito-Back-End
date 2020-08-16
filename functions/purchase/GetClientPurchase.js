import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamoDb";
const table=process.env.tablePurchases;

//Funcao para retornar as compras de um determinado cliente 
export const main = handler( async (event, context) => {
    const parametros={
        TableName: table,
        FilterExpression: "clientId = :clientId",
        ExpressionAttributeValues: {
            ":clientId": event.pathParameters.id
        }
    };
    const result = await dynamoDb.scan(parametros);
    if ( ! result.Items) {
        throw new Error("Não há compras.");
      }
    return result.Items;
});