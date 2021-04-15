export interface DealerItem {
  id: string;
  name: string;
  amountOfCars?: number;
  country: string;
  foundedIn: number;
  newRecord?: boolean;
  headquarters: string;
  registrationDate?: Date;
}

export const initDealer = (): DealerItem => ({
  id: null,
  name: null,
  amountOfCars: 0,
  country: null,
  foundedIn: null,
  newRecord: true,
  headquarters: null,
  registrationDate: null,
});
