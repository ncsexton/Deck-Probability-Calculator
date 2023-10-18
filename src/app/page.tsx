'use client'
import React, { useState } from 'react';

class ProbabilityCalculator {
  totalCards: number;
  starters: number;
  extenders: number;
  exstarters: number;
  draws: number;

  constructor(totalCards: number, starters: number, extenders: number, exstarters: number, draws: number) {
    this.totalCards = totalCards;
    this.starters = starters;
    this.extenders = extenders;
    this.exstarters = exstarters;
    this.draws = draws;
  }

  calculateIndividualProbabilities(): { starter: number; extender: number; exstarter: number } {
    let totalCards = this.totalCards;
    let starterCount = 0;
    let extenderCount = 0;
    let exstarterCount = 0;

    for (let i = 0; i < this.draws; i++) {
      const probStarter = this.starters / totalCards;
      const probExtender = this.extenders / totalCards;
      const probExstarter = this.exstarters / totalCards;

      starterCount += probStarter;
      extenderCount += probExtender;
      exstarterCount += probExstarter;

      totalCards -= 1;
    }

    return {
      starter: starterCount,
      extender: extenderCount,
      exstarter: exstarterCount,
    };
  }

  calculateCumulativeProbabilities(): { starterOrExstarter: number; extenderOrExstarter: number } {
    const individualProbabilities = this.calculateIndividualProbabilities();
    const starterOrExstarter = individualProbabilities.starter + individualProbabilities.exstarter;
    const extenderOrExstarter = individualProbabilities.extender + individualProbabilities.exstarter;

    return {
      starterOrExstarter,
      extenderOrExstarter,
    };
  }
}

function ProbabilityCalculatorComponent() {
  const [individualProbabilities, setIndividualProbabilities] = useState<{ starter: number; extender: number; exstarter: number } | null>(
    null
  );
  const [cumulativeProbabilities, setCumulativeProbabilities] = useState<{ starterOrExstarter: number; extenderOrExstarter: number } | null>(
    null
  );

  const [totalCards, setTotalCards] = useState<number>(40);
  const [starters, setStarters] = useState<number>(10);
  const [extenders, setExtenders] = useState<number>(10);
  const [exstarters, setExstarters] = useState<number>(6);
  const [draws, setDraws] = useState<number>(5);

  const calculateProbabilities = () => {
    const calculator = new ProbabilityCalculator(totalCards, starters, extenders, exstarters, draws);
    const individualProbs = calculator.calculateIndividualProbabilities();
    const cumulativeProbs = calculator.calculateCumulativeProbabilities();

    setIndividualProbabilities(individualProbs);
    setCumulativeProbabilities(cumulativeProbs);
  };

  return (
    <div className="calculator-container">
      <div>
        <label className="input-label">
          Total Cards: <input type="number" value={totalCards} onChange={(e) => setTotalCards(parseInt(e.target.value))} />
        </label>
        <label className="input-label">
          Starters: <input type="number" value={starters} onChange={(e) => setStarters(parseInt(e.target.value))} />
        </label>
        <label className="input-label">
          Extenders: <input type="number" value={extenders} onChange={(e) => setExtenders(parseInt(e.target.value))} />
        </label>
        <label className="input-label">
          Exstarters: <input type="number" value={exstarters} onChange={(e) => setExstarters(parseInt(e.target.value))} />
        </label>
        <label className="input-label">
          Draws: <input type="number" value={draws} onChange={(e) => setDraws(parseInt(e.target.value))} />
        </label>
      </div>
      <button className="calculate-button" onClick={calculateProbabilities}>
        Calculate Probabilities
      </button>
      {individualProbabilities !== null && (
        <div>
          <h2>Individual Probabilities</h2>
          <p>Probability of drawing a Starter: {individualProbabilities.starter.toFixed(4)}</p>
          <p>Probability of drawing an Extender: {individualProbabilities.extender.toFixed(4)}</p>
          <p>Probability of drawing an Exstarter: {individualProbabilities.exstarter.toFixed(4)}</p>
        </div>
      )}
      {cumulativeProbabilities !== null && (
        <div>
          <h2>Cumulative Probabilities</h2>
          <p>Probability of drawing a Starter or Exstarter: {cumulativeProbabilities.starterOrExstarter.toFixed(4)}</p>
          <p>Probability of drawing an Extender or Exstarter: {cumulativeProbabilities.extenderOrExstarter.toFixed(4)}</p>
        </div>
      )}
    </div>
  );
}

export default ProbabilityCalculatorComponent;
