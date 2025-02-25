export interface Banner {
  image: string;
  title: string;
  description: string;
  link: string;
}
export interface BestSeller{
  image: string;
  name: string;
  info: string;
  price: string;
  originalPrice: string;
  ratings: number;
  reviews: number;
  inStock: boolean;
  isFavorite: boolean;
}