export type Cover = { [coverType: string]: { basedPrice: number, carMultiplier: number} }

export type Catalog = {
  brand: string;
  cover: Cover;
}[]
