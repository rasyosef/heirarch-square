export interface Product {
  id: number,
  name: string,
  description: string,
  image_url: string,
  price: number
};

export interface SaleData {
  product_id: number,
  num_sold: number
};

export interface CartItem extends Product {
  count: number,
}