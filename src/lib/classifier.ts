export function computePCollapse(country: {
  internet: number;
  fight: number;
  urban: number;
  gdp: number;
  wlfp: number;
  urbanSpeed: number;
  edu: number;
}): number {
  const z =
    0.95 * ((country.internet - 72) / 24) +
    -0.81 * ((country.fight - 59) / 22) +
    -0.66 * ((country.urban - 66) / 22) +
    0.65 * ((Math.log(country.gdp) - 9.1) / 1.3) +
    0.29 * ((country.wlfp - 45) / 16) +
    0.21 * ((country.urbanSpeed - 3.8) / 2.1) +
    0.05 * ((country.edu - 9.5) / 2.8) +
    0.5;
  return 1 / (1 + Math.exp(-z));
}

export function isModernized(country: { urban: number; internet: number }): boolean {
  return country.urban > 65 && country.internet > 70;
}

export const modelComparison = [
  {
    name: "Structural (6)",
    features: "urban, speed, edu, internet, WLFP, GDP",
    accuracy: 75.8,
    misclassified: 15,
  },
  {
    name: "+ Meaning (7)",
    features: "above + fight_for_country",
    accuracy: 75.8,
    misclassified: 15,
  },
  {
    name: "Minimal (3)",
    features: "urban, edu, internet",
    accuracy: 79.0,
    misclassified: 13,
    highlighted: true,
  },
];
