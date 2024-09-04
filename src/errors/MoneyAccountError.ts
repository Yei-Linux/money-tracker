export class MoneyAccountError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MoneyAccountError";
  }
}
