export const isValidPricing = (price: number) => !isNaN(+price) && +price > 0;
