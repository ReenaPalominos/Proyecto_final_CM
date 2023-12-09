export interface DatosDenuncia {
    token: string | number[];
    timestamp: number;
    title: string;
    description: string;
    file: string | unknown;
    userId: string;
}