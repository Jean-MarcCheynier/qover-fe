export type CoverMap = { [coverType: string]: {
  basePrice: number
  carPriceMultiplier: number
  minAge: number,
}}

export type CatalogItem = {
  _id: string;
  brand: string;
  coverOptions: CoverMap;
}

export type CatalogMap = { [id: string]: CatalogItem }
