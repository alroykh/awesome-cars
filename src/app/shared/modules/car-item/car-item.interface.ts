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
  description?: string;
  wikilink?: string;
  registrationDate?: Date;
  dealerName?: string;
}

export const initCar = (): CarItem => ({
  id: null,
  brand: null,
  model: null,
  year: null,
  color: null,
  class: null,
  category: null,
  image: null,
  liked: false,
  newItem: true,
  description: null,
  wikilink: null,
  registrationDate: null,
  dealerName: null,
});
