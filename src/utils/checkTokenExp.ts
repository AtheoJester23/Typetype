import { jwtDecode } from "jwt-decode";

export interface jwtPayload {
    exp: number;
    [key: string]: any;
}

export function isTokenExpired(token: string): boolean{
    if(!token) return true;

    try {
        const { exp } = jwtDecode<jwtPayload>(token);
        if(!exp) return true;

        //if exp is not expired:
        return Date.now() >= exp * 1000
    } catch (error) {
        console.error("Failed to decode token: ", (error as Error).message)
        return true
    }
}