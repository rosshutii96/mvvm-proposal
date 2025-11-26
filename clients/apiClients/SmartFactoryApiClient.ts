import { injectable } from 'inversify';

@injectable()
export class SmartFactoryApiClient {
    public async get<Req, Res>(url: string, body: Req): Promise<Res> {
        const response = await fetch(`https://gateway-dev.smarfac.com/api/${url}`, {
            body: body ? JSON.stringify(body) : undefined,
            method: 'GET',
        });

        return response.json() as Promise<Res>;
    }

    public async post<Req, Res>(url: string, body: Req): Promise<Res> {
        const response = await fetch(`https://gateway-dev.smarfac.com/api/${url}`, {
            body: body ? JSON.stringify(body) : undefined,
            method: 'POST',
        });

        return response.json() as Promise<Res>;
    }
}
