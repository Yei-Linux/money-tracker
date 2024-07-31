export class InvalidFieldFormError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidFieldFormError';
  }
}
