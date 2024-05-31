import { Category } from "./Category";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  quantity: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  categoryId?: Category;
  bidInfo?: any;

};


export type ProductAdd = Omit<Product, 'id' | 'rating'> & {
  rating: {
    rate: number;
    count: number;
  };
};


export type AddProductForm = {
  title?: string | null,
  price: string | null | undefined;
  description: string  | null;
  category: string  | null;
  image: string  | null;
  isShow: boolean  | null;
}

export type UpdateProductForm = {
  title?: string | null,
  price: string | null | undefined;
  description: string  | null;
  category: string  | null;
  image: string  | null;
  isShow: boolean  | null;
}
