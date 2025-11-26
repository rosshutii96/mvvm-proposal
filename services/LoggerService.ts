import { injectable } from "inversify";

@injectable()
export class LoggerService {
  public logSuccess(message: string): void {
    console.info(`[SUCCESS]: ${message}`);
  }

  public logRequest(message: string): void {
    console.info(`[REQUEST]: ${message}`);
  }

  public logError(message: string, error: unknown): void {
    console.error(`[ERROR]: ${message}, ${error}`);
  }
}
