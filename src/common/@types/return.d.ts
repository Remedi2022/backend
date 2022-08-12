export interface ErrorSafety<T> {
    status: number;
    success: boolean;
    message?: string;
    error?: any;
    result?: T;
}
