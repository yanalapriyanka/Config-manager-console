import { Product } from './product.model';

export class ProductsListResponse{
    Data: Product[];   
    Success: boolean;
    Message : string;
    ErrorDetails : string[];
    StatusCode: number
}
