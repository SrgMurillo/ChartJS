import imprimeCotacao from "./imprimeCotacao.js";

const graficoDolar = document.getElementById("graficoDolar");

const graficoParaDolar = new Chart(graficoDolar, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        borderWidth: 1,
      },
    ],
  },
});

const graficoBTC = document.getElementById("graficoBTC");

const graficoParaBTC = new Chart(graficoBTC, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        borderWidth: 1,
      },
    ],
  },
});

function geraHorario() {
  let data = new Date();
  let horario =
    data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();

  return horario;
}

function adicionarDados(grafico, legenda, dados, titulo) {
  grafico.data.labels.push(legenda);
  grafico.data.datasets.forEach((dataset) => {
    dataset.data.push(dados);
    dataset.label = titulo;
  });
  grafico.update();
}

let workerDolar = new Worker("./script/workers/workerDolar.js");
workerDolar.postMessage("usd");

workerDolar.addEventListener("message", (event) => {
  let tempo = geraHorario();
  let valor = event.data.ask;
  let legenda = event.data.name;
  imprimeCotacao("Dolar", valor);
  adicionarDados(graficoParaDolar, tempo, valor, legenda);
});

let workerBTC = new Worker("./script/workers/workerBTC.js");
workerBTC.postMessage("BTC");

workerBTC.addEventListener("message", (event) => {
  let tempo = geraHorario();
  let valor = event.data.ask;
  let legenda = event.data.name;
  //imprimeCotacao("BTC", valor);
  adicionarDados(graficoParaBTC, tempo, valor, legenda);
});
