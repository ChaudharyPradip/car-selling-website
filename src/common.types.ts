export type CarImage = {
    id: string;
    url: string;
};

export type Car = Record<string, string | CarImage[]>;
