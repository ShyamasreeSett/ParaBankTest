import { APIRequestContext, APIResponse } from '@playwright/test';

export async function getTransactions(
    request: APIRequestContext,
    accountNo: string | number,
    amount: string | number,
    sessionCookie: string,
    baseURL: string
): Promise<APIResponse> {
    const endpoint = `${baseURL}/bank/accounts/${accountNo}/transactions/amount/${amount}?timeout=30000`;
    return request.get(endpoint, { headers: { Cookie: `JSESSIONID=${sessionCookie}` } });
}
