import { Brand } from "./brand";
import { Category } from "./category";
import { Feature } from "./feature";
import { Grade } from "./grade";

export class Product {
    id: number;
    productName: string;
    image: string;
    description: string;
    price: number;
    grade: Grade;
    brand: Brand;
    category: Category;
    features: Feature[];
}