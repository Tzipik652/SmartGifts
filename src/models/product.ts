export interface Product  {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
};
export interface CartProduct extends Product {
  quantity: number;
}