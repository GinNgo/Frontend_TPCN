export interface Product {
  ProductId: number;
  ProductName: string;
  ShortDesc: string;
  FullDesc: string;
  Image: string;
  Price: number;
  PriceDiscount: number;
  BrandId: number;
  Origin: string;
  CategoryId: number;
  Status: boolean;
  IsDeleted: boolean;
  isSelected: boolean;
}

export interface ProductExport {
  ProductId: number;
  ProductName: string;
  ShortDesc: string;
  Image: string;
  Price: number;
  PriceDiscount: number;
  BrandName: string;
  Origin: string;
  Status: boolean;
}
