export interface Category {
  id: number;
  description: string;
  image: string | null;
  name: string;
  parentCategoryId: number | null;
  SubCategories: Category[];
}
