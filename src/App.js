import "./App.css";
import { useState, useRef, useCallback } from "react";
import Crossword from "react-crossword-near";
import { parseSolutionSeedPhrase } from "./near/utils.js";
import { createGridData, loadGuesses } from "react-crossword-near/dist/es/util";
import sha256 from "js-sha256";

const App = ({ data, solutionHash }) => {
  const crossword = useRef();
  const [solutionFound, setSolutionFound] = useState("Not correct yet");

  const onCrosswordComplete = useCallback(async (completeCount) => {
    if (completeCount !== false) {
      let gridData = createGridData(data).gridData;
      loadGuesses(gridData, "guesses");
      await checkSolution(gridData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function checkSolution(gridData) {
    let seedPhrase = parseSolutionSeedPhrase(data, gridData);
    let answerHash = sha256.sha256(seedPhrase);
    if (answerHash === solutionHash) {
      console.log("You're correct!");
      setSolutionFound("Correct!");
    } else {
      console.log("That's not the correct solution. :/");
      setSolutionFound("Not correct yet");
    }
  }

  return (
    <div id="page" className="App">
      <h1>NEAR Crossword Puzzle</h1>
      <div id="crossword-wrapper">
        <h3>Status: {solutionFound}</h3>
        <Crossword
          data={data}
          ref={crossword}
          onCrosswordComplete={onCrosswordComplete}
        />
      </div>
      <footer>
        <p>
          Thank you{" "}
          <a
            href="https://github.com/JaredReisinger/react-crossword"
            target="_blank"
            rel="noreferrer"
          >
            @jaredreisinger/react-crossword
          </a>
          !
        </p>
      </footer>
    </div>
  );
};
export default App;
