export class GenericResult<T extends any> {
    success: boolean;
    payload: T;
    message: string;
    error: any;
}