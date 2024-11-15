export type TCategory = {
  id: string;
  _id: string;
  category: string;
  transactionType: string;
  categories?: Array<TCategory>;
};

export type TCategories = Array<TCategory>;

export type CategoriesBoardType = {
  parentCategoriesColumns: Record<
    string,
    { id: string; title: string; itemsOrder: Array<string> }
  >;
  categories: Record<
    string,
    { id: string; title: string; transactionType: string }
  >;
};

export type UpdateParentCategory = { id: string; title: string };

export type UpdateCategory = {
  id?: string;
  category: string;
  transactionType: string;
  parentCategory: string;
};
