export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageurl: string;
}

export interface AddProductModel{
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}