export interface Category {
  CatId: number;
  CatName: string;
  ParentId: number;
  Status: boolean;
  IsDeleted: boolean;
  CategoryChild: Category[];
  isSelected: boolean;
}
