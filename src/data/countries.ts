export interface Country {
  name: string;
  iso3: string;
  numericCode: string;
  tfr: number;
  urban: number;
  urbanSpeed: number;
  edu: number;
  internet: number;
  wlfp: number;
  fight: number;
  gini: number;
  gdp: number;
  region: string;
  collapsed: boolean;
  pCollapse: number;
  lat: number;
  lng: number;
}

export const countries: Country[] = [
  { name: "South Korea", iso3: "KOR", numericCode: "410", tfr: 0.75, urban: 83, urbanSpeed: 3, edu: 12.5, internet: 98, wlfp: 54, fight: 42, gini: 31.4, gdp: 35000, region: "East Asia", collapsed: true, pCollapse: 0.97, lat: 37.5, lng: 127.0 },
  { name: "Hong Kong", iso3: "HKG", numericCode: "344", tfr: 0.80, urban: 100, urbanSpeed: 2, edu: 12.0, internet: 93, wlfp: 54, fight: 38, gini: 53.9, gdp: 50000, region: "East Asia", collapsed: true, pCollapse: 0.94, lat: 22.3, lng: 114.2 },
  { name: "Taiwan", iso3: "TWN", numericCode: "158", tfr: 0.87, urban: 80, urbanSpeed: 4, edu: 12.4, internet: 92, wlfp: 51, fight: 50, gini: 33.6, gdp: 32000, region: "East Asia", collapsed: true, pCollapse: 0.95, lat: 25.0, lng: 121.5 },
  { name: "Ukraine", iso3: "UKR", numericCode: "804", tfr: 0.90, urban: 70, urbanSpeed: 2, edu: 11.3, internet: 79, wlfp: 48, fight: 62, gini: 26.6, gdp: 3200, region: "Europe", collapsed: true, pCollapse: 0.68, lat: 49.0, lng: 32.0 },
  { name: "China", iso3: "CHN", numericCode: "156", tfr: 1.00, urban: 65, urbanSpeed: 12, edu: 8.1, internet: 73, wlfp: 61, fight: 71, gini: 38.5, gdp: 12000, region: "East Asia", collapsed: true, pCollapse: 0.91, lat: 35.0, lng: 105.0 },
  { name: "Singapore", iso3: "SGP", numericCode: "702", tfr: 1.00, urban: 100, urbanSpeed: 5, edu: 11.6, internet: 96, wlfp: 60, fight: 77, gini: 45.9, gdp: 65000, region: "East Asia", collapsed: true, pCollapse: 0.89, lat: 1.35, lng: 103.8 },
  { name: "Thailand", iso3: "THA", numericCode: "764", tfr: 1.10, urban: 53, urbanSpeed: 6, edu: 8.1, internet: 88, wlfp: 59, fight: 72, gini: 35.0, gdp: 7500, region: "SE Asia", collapsed: true, pCollapse: 0.91, lat: 15.9, lng: 100.5 },
  { name: "Italy", iso3: "ITA", numericCode: "380", tfr: 1.20, urban: 71, urbanSpeed: 2, edu: 10.2, internet: 87, wlfp: 42, fight: 20, gini: 35.2, gdp: 34000, region: "Europe", collapsed: true, pCollapse: 0.98, lat: 42.5, lng: 12.5 },
  { name: "Japan", iso3: "JPN", numericCode: "392", tfr: 1.20, urban: 92, urbanSpeed: 2, edu: 12.9, internet: 93, wlfp: 53, fight: 11, gini: 32.9, gdp: 40000, region: "East Asia", collapsed: true, pCollapse: 0.98, lat: 36.2, lng: 138.3 },
  { name: "Spain", iso3: "ESP", numericCode: "724", tfr: 1.20, urban: 81, urbanSpeed: 3, edu: 10.3, internet: 93, wlfp: 52, fight: 75, gini: 34.7, gdp: 30000, region: "Europe", collapsed: true, pCollapse: 0.86, lat: 40.5, lng: -3.7 },
  { name: "Canada", iso3: "CAN", numericCode: "124", tfr: 1.30, urban: 82, urbanSpeed: 3, edu: 13.1, internet: 97, wlfp: 61, fight: 45, gini: 33.3, gdp: 46000, region: "Americas", collapsed: true, pCollapse: 0.97, lat: 56.1, lng: -106.3 },
  { name: "Finland", iso3: "FIN", numericCode: "246", tfr: 1.30, urban: 86, urbanSpeed: 4, edu: 12.4, internet: 93, wlfp: 55, fight: 74, gini: 27.3, gdp: 48000, region: "Europe", collapsed: true, pCollapse: 0.90, lat: 61.9, lng: 25.7 },
  { name: "Greece", iso3: "GRC", numericCode: "300", tfr: 1.30, urban: 80, urbanSpeed: 4, edu: 10.5, internet: 83, wlfp: 45, fight: 54, gini: 34.4, gdp: 20000, region: "Europe", collapsed: true, pCollapse: 0.88, lat: 39.1, lng: 21.8 },
  { name: "Poland", iso3: "POL", numericCode: "616", tfr: 1.30, urban: 60, urbanSpeed: 2, edu: 12.3, internet: 87, wlfp: 49, fight: 47, gini: 29.7, gdp: 18000, region: "Europe", collapsed: true, pCollapse: 0.95, lat: 51.9, lng: 19.1 },
  { name: "Germany", iso3: "DEU", numericCode: "276", tfr: 1.35, urban: 78, urbanSpeed: 2, edu: 13.2, internet: 93, wlfp: 56, fight: 18, gini: 31.7, gdp: 48000, region: "Europe", collapsed: true, pCollapse: 0.99, lat: 51.2, lng: 10.4 },
  { name: "Austria", iso3: "AUT", numericCode: "040", tfr: 1.40, urban: 59, urbanSpeed: 2, edu: 12.3, internet: 93, wlfp: 55, fight: 21, gini: 30.5, gdp: 50000, region: "Europe", collapsed: true, pCollapse: 0.99, lat: 47.5, lng: 14.6 },
  { name: "Norway", iso3: "NOR", numericCode: "578", tfr: 1.40, urban: 84, urbanSpeed: 3, edu: 12.6, internet: 98, wlfp: 61, fight: 43, gini: 27.0, gdp: 65000, region: "Europe", collapsed: true, pCollapse: 0.98, lat: 60.5, lng: 8.5 },
  { name: "Portugal", iso3: "PRT", numericCode: "620", tfr: 1.40, urban: 67, urbanSpeed: 5, edu: 9.2, internet: 82, wlfp: 52, fight: 28, gini: 33.8, gdp: 24000, region: "Europe", collapsed: true, pCollapse: 0.97, lat: 39.4, lng: -8.2 },
  { name: "Russia", iso3: "RUS", numericCode: "643", tfr: 1.40, urban: 75, urbanSpeed: 2, edu: 12.2, internet: 85, wlfp: 55, fight: 59, gini: 36.0, gdp: 12000, region: "Europe", collapsed: true, pCollapse: 0.86, lat: 61.5, lng: 105.3 },
  { name: "Switzerland", iso3: "CHE", numericCode: "756", tfr: 1.40, urban: 74, urbanSpeed: 2, edu: 13.0, internet: 96, wlfp: 62, fight: 39, gini: 33.1, gdp: 72000, region: "Europe", collapsed: true, pCollapse: 0.98, lat: 46.8, lng: 8.2 },
  { name: "Chile", iso3: "CHL", numericCode: "152", tfr: 1.50, urban: 88, urbanSpeed: 5, edu: 10.5, internet: 82, wlfp: 53, fight: 43, gini: 44.9, gdp: 16000, region: "Americas", collapsed: true, pCollapse: 0.90, lat: -35.7, lng: -71.5 },
  { name: "Colombia", iso3: "COL", numericCode: "170", tfr: 1.50, urban: 82, urbanSpeed: 5, edu: 8.5, internet: 73, wlfp: 53, fight: 63, gini: 54.2, gdp: 6500, region: "Americas", collapsed: true, pCollapse: 0.69, lat: 4.6, lng: -74.1 },
  { name: "Cuba", iso3: "CUB", numericCode: "192", tfr: 1.50, urban: 78, urbanSpeed: 4, edu: 11.8, internet: 71, wlfp: 44, fight: 75, gini: 38.0, gdp: 9000, region: "Americas", collapsed: true, pCollapse: 0.58, lat: 21.5, lng: -79.0 },
  { name: "Denmark", iso3: "DNK", numericCode: "208", tfr: 1.50, urban: 88, urbanSpeed: 2, edu: 12.7, internet: 98, wlfp: 58, fight: 37, gini: 28.2, gdp: 58000, region: "Europe", collapsed: true, pCollapse: 0.97, lat: 56.3, lng: 9.5 },
  { name: "Hungary", iso3: "HUN", numericCode: "348", tfr: 1.50, urban: 72, urbanSpeed: 2, edu: 11.9, internet: 89, wlfp: 47, fight: 58, gini: 30.6, gdp: 18000, region: "Europe", collapsed: true, pCollapse: 0.90, lat: 47.2, lng: 19.5 },
  { name: "Netherlands", iso3: "NLD", numericCode: "528", tfr: 1.50, urban: 93, urbanSpeed: 2, edu: 12.2, internet: 96, wlfp: 58, fight: 15, gini: 28.5, gdp: 53000, region: "Europe", collapsed: true, pCollapse: 0.98, lat: 52.1, lng: 5.3 },
  { name: "Sweden", iso3: "SWE", numericCode: "752", tfr: 1.50, urban: 89, urbanSpeed: 3, edu: 12.6, internet: 97, wlfp: 69, fight: 55, gini: 28.8, gdp: 52000, region: "Europe", collapsed: true, pCollapse: 0.96, lat: 60.1, lng: 18.6 },
  { name: "UK", iso3: "GBR", numericCode: "826", tfr: 1.50, urban: 84, urbanSpeed: 2, edu: 13.0, internet: 96, wlfp: 58, fight: 27, gini: 35.1, gdp: 42000, region: "Europe", collapsed: true, pCollapse: 0.98, lat: 55.4, lng: -3.4 },
  { name: "Australia", iso3: "AUS", numericCode: "036", tfr: 1.60, urban: 87, urbanSpeed: 3, edu: 12.7, internet: 96, wlfp: 61, fight: 29, gini: 34.4, gdp: 52000, region: "Oceania", collapsed: true, pCollapse: 0.98, lat: -25.3, lng: 133.8 },
  { name: "Brazil", iso3: "BRA", numericCode: "076", tfr: 1.60, urban: 88, urbanSpeed: 5, edu: 8.0, internet: 81, wlfp: 53, fight: 66, gini: 53.4, gdp: 9000, region: "Americas", collapsed: true, pCollapse: 0.73, lat: -14.2, lng: -51.9 },
  { name: "Romania", iso3: "ROU", numericCode: "642", tfr: 1.60, urban: 55, urbanSpeed: 2, edu: 11.0, internet: 80, wlfp: 45, fight: 38, gini: 34.8, gdp: 15000, region: "Europe", collapsed: true, pCollapse: 0.95, lat: 45.9, lng: 24.97 },
  { name: "Turkey", iso3: "TUR", numericCode: "792", tfr: 1.60, urban: 77, urbanSpeed: 7, edu: 8.0, internet: 83, wlfp: 34, fight: 73, gini: 41.9, gdp: 10000, region: "MENA", collapsed: true, pCollapse: 0.75, lat: 38.9, lng: 35.2 },
  { name: "USA", iso3: "USA", numericCode: "840", tfr: 1.60, urban: 84, urbanSpeed: 3, edu: 13.4, internet: 92, wlfp: 57, fight: 44, gini: 41.4, gdp: 60000, region: "Americas", collapsed: true, pCollapse: 0.97, lat: 37.1, lng: -95.7 },
  { name: "Czech Republic", iso3: "CZE", numericCode: "203", tfr: 1.70, urban: 74, urbanSpeed: 2, edu: 12.7, internet: 91, wlfp: 52, fight: 23, gini: 25.0, gdp: 24000, region: "Europe", collapsed: true, pCollapse: 0.98, lat: 49.8, lng: 15.5 },
  { name: "France", iso3: "FRA", numericCode: "250", tfr: 1.70, urban: 82, urbanSpeed: 3, edu: 11.5, internet: 90, wlfp: 51, fight: 29, gini: 32.4, gdp: 40000, region: "Europe", collapsed: true, pCollapse: 0.97, lat: 46.2, lng: 2.2 },
  { name: "Malaysia", iso3: "MYS", numericCode: "458", tfr: 1.80, urban: 78, urbanSpeed: 6, edu: 10.6, internet: 97, wlfp: 56, fight: 69, gini: 41.1, gdp: 12000, region: "SE Asia", collapsed: true, pCollapse: 0.91, lat: 4.2, lng: 101.9 },
  { name: "Mexico", iso3: "MEX", numericCode: "484", tfr: 1.80, urban: 81, urbanSpeed: 4, edu: 8.8, internet: 76, wlfp: 45, fight: 56, gini: 45.4, gdp: 10000, region: "Americas", collapsed: true, pCollapse: 0.77, lat: 23.6, lng: -102.6 },
  { name: "Argentina", iso3: "ARG", numericCode: "032", tfr: 1.90, urban: 92, urbanSpeed: 3, edu: 10.8, internet: 87, wlfp: 50, fight: 40, gini: 42.3, gdp: 10000, region: "Americas", collapsed: true, pCollapse: 0.87, lat: -38.4, lng: -63.6 },
  { name: "Sri Lanka", iso3: "LKA", numericCode: "144", tfr: 1.90, urban: 19, urbanSpeed: 2, edu: 10.6, internet: 47, wlfp: 34, fight: 80, gini: 39.3, gdp: 4000, region: "S Asia", collapsed: true, pCollapse: 0.54, lat: 7.9, lng: 80.8 },
  { name: "Vietnam", iso3: "VNM", numericCode: "704", tfr: 1.90, urban: 39, urbanSpeed: 5, edu: 8.3, internet: 79, wlfp: 72, fight: 89, gini: 35.7, gdp: 4000, region: "SE Asia", collapsed: true, pCollapse: 0.83, lat: 14.1, lng: 108.3 },
  { name: "Bangladesh", iso3: "BGD", numericCode: "050", tfr: 1.95, urban: 40, urbanSpeed: 6, edu: 6.2, internet: 40, wlfp: 36, fight: 86, gini: 32.4, gdp: 2800, region: "S Asia", collapsed: true, pCollapse: 0.30, lat: 23.7, lng: 90.4 },
  { name: "Morocco", iso3: "MAR", numericCode: "504", tfr: 1.97, urban: 67, urbanSpeed: 6, edu: 5.9, internet: 84, wlfp: 21, fight: 94, gini: 39.5, gdp: 3800, region: "MENA", collapsed: true, pCollapse: 0.45, lat: 31.8, lng: -7.1 },
  { name: "India", iso3: "IND", numericCode: "356", tfr: 2.00, urban: 36, urbanSpeed: 4, edu: 6.7, internet: 49, wlfp: 24, fight: 75, gini: 35.7, gdp: 2500, region: "S Asia", collapsed: true, pCollapse: 0.40, lat: 20.6, lng: 79.0 },
  { name: "Myanmar", iso3: "MMR", numericCode: "104", tfr: 2.00, urban: 32, urbanSpeed: 4, edu: 5.0, internet: 44, wlfp: 48, fight: 70, gini: 30.7, gdp: 1200, region: "SE Asia", collapsed: true, pCollapse: 0.43, lat: 21.9, lng: 95.9 },
  { name: "Iran", iso3: "IRN", numericCode: "364", tfr: 2.08, urban: 77, urbanSpeed: 7, edu: 10.3, internet: 79, wlfp: 18, fight: 74, gini: 40.9, gdp: 6500, region: "MENA", collapsed: true, pCollapse: 0.60, lat: 32.4, lng: 53.7 },
  { name: "Tunisia", iso3: "TUN", numericCode: "788", tfr: 2.08, urban: 70, urbanSpeed: 5, edu: 7.2, internet: 67, wlfp: 24, fight: 65, gini: 32.8, gdp: 3800, region: "MENA", collapsed: true, pCollapse: 0.50, lat: 33.9, lng: 9.5 },
  { name: "Indonesia", iso3: "IDN", numericCode: "360", tfr: 2.10, urban: 58, urbanSpeed: 5, edu: 8.6, internet: 62, wlfp: 53, fight: 70, gini: 37.9, gdp: 4800, region: "SE Asia", collapsed: false, pCollapse: 0.66, lat: -0.8, lng: 113.9 },
  { name: "South Africa", iso3: "ZAF", numericCode: "710", tfr: 2.30, urban: 68, urbanSpeed: 4, edu: 10.2, internet: 72, wlfp: 47, fight: 52, gini: 63.0, gdp: 6000, region: "Africa", collapsed: false, pCollapse: 0.80, lat: -30.6, lng: 22.9 },
  { name: "Saudi Arabia", iso3: "SAU", numericCode: "682", tfr: 2.40, urban: 85, urbanSpeed: 6, edu: 10.2, internet: 99, wlfp: 24, fight: 94, gini: 45.9, gdp: 27000, region: "MENA", collapsed: false, pCollapse: 0.74, lat: 23.9, lng: 45.1 },
  { name: "Egypt", iso3: "EGY", numericCode: "818", tfr: 2.41, urban: 43, urbanSpeed: 2, edu: 7.3, internet: 72, wlfp: 14, fight: 73, gini: 31.5, gdp: 4200, region: "MENA", collapsed: false, pCollapse: 0.59, lat: 26.8, lng: 30.8 },
  { name: "Jordan", iso3: "JOR", numericCode: "400", tfr: 2.60, urban: 92, urbanSpeed: 5, edu: 10.5, internet: 90, wlfp: 15, fight: 63, gini: 33.7, gdp: 4500, region: "MENA", collapsed: false, pCollapse: 0.59, lat: 30.6, lng: 36.2 },
  { name: "Philippines", iso3: "PHL", numericCode: "608", tfr: 2.70, urban: 48, urbanSpeed: 4, edu: 9.4, internet: 55, wlfp: 46, fight: 73, gini: 42.3, gdp: 3500, region: "SE Asia", collapsed: false, pCollapse: 0.55, lat: 12.9, lng: 121.8 },
  { name: "Algeria", iso3: "DZA", numericCode: "012", tfr: 2.70, urban: 74, urbanSpeed: 5, edu: 8.0, internet: 71, wlfp: 18, fight: 69, gini: 27.6, gdp: 4000, region: "MENA", collapsed: false, pCollapse: 0.46, lat: 28.0, lng: 1.7 },
  { name: "Israel", iso3: "ISR", numericCode: "376", tfr: 2.90, urban: 93, urbanSpeed: 2, edu: 13.0, internet: 90, wlfp: 61, fight: 66, gini: 39.0, gdp: 42000, region: "MENA", collapsed: false, pCollapse: 0.87, lat: 31.0, lng: 34.9 },
  { name: "Kenya", iso3: "KEN", numericCode: "404", tfr: 3.20, urban: 29, urbanSpeed: 5, edu: 6.6, internet: 30, wlfp: 37, fight: 75, gini: 40.8, gdp: 2100, region: "Africa", collapsed: false, pCollapse: 0.32, lat: -0.02, lng: 37.9 },
  { name: "Iraq", iso3: "IRQ", numericCode: "368", tfr: 3.30, urban: 71, urbanSpeed: 3, edu: 6.4, internet: 75, wlfp: 12, fight: 81, gini: 29.5, gdp: 4700, region: "MENA", collapsed: false, pCollapse: 0.35, lat: 33.2, lng: 43.7 },
  { name: "Pakistan", iso3: "PAK", numericCode: "586", tfr: 3.30, urban: 37, urbanSpeed: 4, edu: 4.5, internet: 36, wlfp: 22, fight: 89, gini: 29.6, gdp: 1500, region: "S Asia", collapsed: false, pCollapse: 0.13, lat: 30.4, lng: 69.3 },
  { name: "Ghana", iso3: "GHA", numericCode: "288", tfr: 3.60, urban: 59, urbanSpeed: 6, edu: 7.9, internet: 58, wlfp: 60, fight: 76, gini: 43.5, gdp: 2400, region: "Africa", collapsed: false, pCollapse: 0.53, lat: 7.9, lng: -1.0 },
  { name: "Ethiopia", iso3: "ETH", numericCode: "231", tfr: 4.10, urban: 23, urbanSpeed: 4, edu: 3.0, internet: 25, wlfp: 73, fight: 82, gini: 35.0, gdp: 1000, region: "Africa", collapsed: false, pCollapse: 0.28, lat: 9.1, lng: 40.5 },
  { name: "Afghanistan", iso3: "AFG", numericCode: "004", tfr: 4.20, urban: 26, urbanSpeed: 3, edu: 3.7, internet: 19, wlfp: 7, fight: 76, gini: 29.4, gdp: 500, region: "S Asia", collapsed: false, pCollapse: 0.06, lat: 33.9, lng: 67.7 },
  { name: "Tanzania", iso3: "TZA", numericCode: "834", tfr: 4.60, urban: 37, urbanSpeed: 7, edu: 5.8, internet: 22, wlfp: 72, fight: 85, gini: 40.5, gdp: 1200, region: "Africa", collapsed: false, pCollapse: 0.24, lat: -6.4, lng: 34.9 },
  { name: "Nigeria", iso3: "NGA", numericCode: "566", tfr: 4.80, urban: 55, urbanSpeed: 8, edu: 6.2, internet: 36, wlfp: 50, fight: 69, gini: 35.1, gdp: 2200, region: "Africa", collapsed: false, pCollapse: 0.37, lat: 9.1, lng: 8.7 },
];

export const countryByNumericCode = new Map<string, Country>(
  countries.map(c => [c.numericCode, c])
);

export const countryByIso3 = new Map<string, Country>(
  countries.map(c => [c.iso3, c])
);

export const regions = Array.from(new Set(countries.map(c => c.region))).sort();

export const regionColors: Record<string, string> = {
  "Africa": "#E67E22",
  "Americas": "#9B59B6",
  "East Asia": "#E74C3C",
  "Europe": "#4A90D9",
  "MENA": "#D4880F",
  "Oceania": "#1ABC9C",
  "S Asia": "#27AE60",
  "SE Asia": "#F39C12",
};
