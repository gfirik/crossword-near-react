import * as nearAPI from "near-api-js";

export async function viewMethodOnContract(nearConfig, method) {
  const provider = new nearAPI.providers.JsonRpcProvider(nearConfig.nodeUrl);
  const rawResult = await provider.query(
    `call/${nearConfig.contractName}/${method}`,
    "AQ4"
  );
  return JSON.parse(
    rawResult.result.map((x) => String.fromCharCode(x)).join("")
  );
}

export function parseSolutionSeedPhrase(data, gridData) {
  let totalClues = Object.keys(data.across)
    .concat(Object.keys(data.down))
    .map((n) => parseInt(n))
    .reduce((n, m) => Math.max(n, m));

  let seedPhrase = [];
  for (let i = 1; i <= totalClues; i++) {
    let word = "";
    let iString = i.toString();
    if (data.across.hasOwnProperty(iString)) {
      const answerLength = data.across[i].answer.length;
      for (let j = 0; j < answerLength; j++) {
        word +=
          gridData[data["across"][i].row][data["across"][i].col + j].guess;
      }
      seedPhrase.push(word);
    }
    word = "";
    if (data.down.hasOwnProperty(iString)) {
      const answerLength = data.down[i].answer.length;
      for (let j = 0; j < answerLength; j++) {
        word += gridData[data["down"][i].row + j][data["down"][i].col].guess;
      }
      seedPhrase.push(word);
    }
  }
  const finalSeedPhrase = seedPhrase.map((w) => w.toLowerCase()).join(" ");
  console.log(
    `Crossword solution as seed phrase: %c${finalSeedPhrase}`,
    "color: #00C1DE;"
  );
  return finalSeedPhrase;
}
