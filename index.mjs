import express from "express";

function chamaBanco(callback) {
  // Apenas simulando a conexão com o banco de dados
  var connect = new Promise((resolve, reject) => {
    // Simulando um client de banco de dados, o correto dentro desse cara é ter todos os métodos de session e etc
    const client = {
      query: (queryString) => [{"foo": "bar"}],
    };
    resolve(client);
  });

  connect.then((client) => {
    callback(client);
  });
}

// Express
const app = express();

app.get("/", async (_req, res) => {

  let results;

  const awaitForQuery = new Promise((resolve, _reject) => {
    const callbackResults = (client) => {
      results = client.query("SELECT * FROM Foo");
      resolve();
    };

    chamaBanco(callbackResults);
  });

  await awaitForQuery;

  return res.send(results);
});

const server = app.listen(8080, () => console.log("Server online"));
