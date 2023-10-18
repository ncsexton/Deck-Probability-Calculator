function calculateProbability(): number {
    let totalCards = 40; // Total number of cards in the deck
    const starters = 10; // Number of Starter cards
    const extenders = 10; // Number of Extender cards
    const exstarters = 6; // Number of Exstarter cards
    const draws = 5; // Number of cards drawn in a hand
  
    let probability = 0;
  
    for (let i = 0; i < draws; i++) {
      // Calculate the probability of drawing a Starter or an Extender on this draw
      const probStarterOrExtender = (starters + extenders) / totalCards;
  
      // Calculate the probability of drawing an Exstarter on this draw
      const probExstarter = (exstarters / totalCards);
  
      // Calculate the probability of drawing either a Starter or Extender (accounting for Exstarters)
      const probAtLeastOneStarterOrExtender = 1 - (1 - probStarterOrExtender) ** (i + 1);
  
      // Add the probability of drawing an Exstarter and either a Starter or Extender (accounting for Exstarters)
      probability += (probExstarter * probAtLeastOneStarterOrExtender);
  
      // Remove the drawn card from the deck
      totalCards -= 1;
    }
  
    return probability;
  }
  
  // Call the function to get the probability
  const probability = calculateProbability();
  console.log(`Probability of drawing a Starter or an Extender: ${probability}`);