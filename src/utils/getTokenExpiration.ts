import { jwtDecode } from "jwt-decode";
import type { jwtPayload } from "./checkTokenExp";

export function getTokenExpiration(token: string){
    try {
        const {exp} = jwtDecode<jwtPayload>(token);
        if(!exp) return null;

        return exp * 1000;
    } catch (error) {
        console.error("Failed to decode token: ", (error as Error).message);
        return null;
    }
}