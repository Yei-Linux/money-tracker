export type TCategory = {
  _id: string;
  category: string;
  categories?: Array<TCategory>;
};

export type TCategories = Array<TCategory>;
