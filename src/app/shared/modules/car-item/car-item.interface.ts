export interface CarItem {
    id: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    class?: string;
    category?: string;
    image?: string;
    liked: boolean;
    newItem: boolean;
  }
