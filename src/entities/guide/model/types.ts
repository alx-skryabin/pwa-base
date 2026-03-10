/** Запись справочника — все guide-таблицы используют keyPath id. */
export interface GuideRecord {
  id: number

  [key: string]: unknown
}

interface ReligionEntry {
  name: string
  percentage: number
}

// --- continents.json ---
export interface Continent {
  id: number
  name: string
  square: number
  squarePercentage: number
  population: number
  populationPercentage: number
  countries: number
  countriesPercentage: number
  religions: ReligionEntry[]
  climate: string[]
  description: string
}

// --- countries.json ---
export interface Country {
  id: number
  name: string
  nameEn: string
  capital: string
  capitalEn: string
  languages: string
  currency: string
  currencySymbol: string
  phoneCode: string
  isoCode: string
  isoCode3: string
  flag: string
  neighbors: number[]
  population: number
  populationCapital: number
  urbanPercentage: number
  square: number
  religions: ReligionEntry[]
  timezones: string[]
  established: number
  government: string
  continentId: number
}

// --- regions-rus.json ---

export interface RegionRus {
  id: number
  name: string
  center: string
  regionCode: number
  searchCodes: number[]
  type: string
  population: number
  populationCenter: number
}
