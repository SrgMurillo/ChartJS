async function conectaAPI() {
  const conecta = await fetch(
    `https://economia.awesomeapi.com.br/json/last/BTC-BRL`
  );
  const conectaTraduzido = await conecta.json();
  console.log(conectaTraduzido);
  postMessage(conectaTraduzido.BTCBRL);
}

addEventListener("message", () => {
  conectaAPI();
  setInterval(() => conectaAPI(), 5000);
});
