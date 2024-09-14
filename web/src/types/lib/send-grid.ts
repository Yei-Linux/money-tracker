export interface EmailProvider {
  send: (email: string, body: string, sbugject: string) => Promise<void>;
}
