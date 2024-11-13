export type TCategory = {
  _id: string;
  category: string;
  transactionType: string;
  categories?: Array<TCategory>;
};

export type TCategories = Array<TCategory>;
