import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamoDb";
const table=process.env.tableProducts;

//Funcao responsával por retornar todos os produtos
export const main = handler( async (event, context) => {
    const parametros ={
        TableName: table
    };
    const result = await dynamoDb.scan(parametros);
    if ( ! result.Items) {
        throw new Error("Não há produtos.");
      }
    return result.Items;
});
