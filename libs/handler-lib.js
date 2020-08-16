export default function handler(lambda) {
    return async function (event, context) {
      let body, statusCode;
      try {
        // Roda a função
        body = await lambda(event, context);
        statusCode = 200;
      } catch (e) {
        body = { error: e.message };
        statusCode = 500;
      }
      //  HTTP response
      return {
        statusCode,
        body: JSON.stringify(body),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
    };
  }