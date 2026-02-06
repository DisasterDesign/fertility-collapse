export const israelPopulations = [
  { group: "Jewish", tfr: 3.06, trend: "Rising" as const, growth: "+1.1%", color: "#4A90D9" },
  { group: "Muslim", tfr: 2.75, trend: "Declining" as const, growth: "+2.0%", color: "#27AE60" },
  { group: "Christian", tfr: 1.61, trend: "Collapsed" as const, growth: "-0.2%", color: "#C0392B" },
  { group: "Druze", tfr: 1.66, trend: "Collapsed" as const, growth: "-0.9%", color: "#E74C3C" },
  { group: "Other", tfr: 1.13, trend: "Deep collapse" as const, growth: "n/a", color: "#888899" },
];

export const druzeTrajectory = [
  { year: 1964, tfr: 7.9 },
  { year: 1970, tfr: 7.5 },
  { year: 1975, tfr: 6.8 },
  { year: 1980, tfr: 5.8 },
  { year: 1985, tfr: 4.8 },
  { year: 1990, tfr: 4.2 },
  { year: 1995, tfr: 3.5 },
  { year: 2000, tfr: 2.9 },
  { year: 2005, tfr: 2.5 },
  { year: 2010, tfr: 2.3 },
  { year: 2015, tfr: 2.1 },
  { year: 2018, tfr: 2.0 },
  { year: 2020, tfr: 1.9 },
  { year: 2022, tfr: 1.85 },
  { year: 2024, tfr: 1.66 },
];

export const warBabyBoom = {
  sept2023births: 14878,
  sept2024births: 15968,
  change: "+7.3%",
  tfrPeakMonths: 3.19,
  tfrBaseline: 3.06,
};

export const druzeChecklist = [
  { factor: "Rural villages", present: true, expected: "High fertility", actual: "1.66" },
  { factor: "Deeply religious", present: true, expected: "High fertility", actual: "1.66" },
  { factor: "Low divorce (78% two-parent)", present: true, expected: "High fertility", actual: "1.66" },
  { factor: "Early marriage (84% by 34)", present: true, expected: "High fertility", actual: "1.66" },
  { factor: "IDF military service", present: true, expected: "High fertility", actual: "1.66" },
  { factor: "Endogamous community", present: true, expected: "High fertility", actual: "1.66" },
];
