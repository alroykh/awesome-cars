import { CarItem } from '../../app/shared/modules/car-item/car-item.interface';
import { DealerItem } from '../../app/shared/modules/dealer-item/dealer-item.interface';

export const CARS: CarItem[] = [
  {
    id: '0308202883',
    brand: 'Chevrolet',
    model: 'Camaro Z/28',
    year: 1967,
    color: 'red',
    class: 'muscle car',
    category: 'coupe',
    image: './assets/images/z28-camaro.jpg',
    liked: false,
    newItem: false
  },
  {
    id: '0127594376',
    brand: 'Pagani',
    model: 'Huayra BC',
    year: null,
    color: 'white',
    class: 'sport car',
    category: 'coupe',
    image: './assets/images/pagani-huayra.jpg',
    liked: false,
    newItem: false
  },
  {
    id: '4728482911',
    brand: 'McLaren',
    model: 'P1',
    year: null,
    color: 'white',
    class: 'sport',
    category: 'coupe',
    image: './assets/images/mclaren-p1.jpg',
    liked: true,
    newItem: false
  },
  {
    id: '4242867698',
    brand: 'Toyota',
    model: 'Celica',
    year: null,
    color: 'black',
    class: 'sport',
    category: 'coupe',
    image: './assets/images/toyota-celica.jpg',
    liked: false,
    newItem: false
  },
  {
    id: '9285516267',
    brand: 'Ford',
    model: 'GT',
    year: 2006,
    color: 'white',
    class: 'sport',
    category: 'roadster',
    image: './assets/images/ford-gt.jpg',
    liked: false,
    newItem: false
  },
  {
    id: '8665532184',
    brand: 'Audi',
    model: 'A6',
    year: 2015,
    color: 'silver',
    class: 'executive car',
    category: 'sedan',
    image: './assets/images/audi-a6.jpg',
    liked: false,
    newItem: false
  },
  {
    id: '8992876242',
    brand: 'Jeep',
    model: 'Wrangler',
    year: 2011,
    color: 'yellow',
    category: 'offroader',
    image: './assets/images/jeep-wrangler.jpg',
    liked: true,
    newItem: false
  },
  {
    id: '8440038264',
    brand: 'Toyota',
    model: 'FJ Cruiser',
    year: 2006,
    color: 'aquamarine',
    category: 'offroader',
    class: 'crossover',
    image: './assets/images/toyota-fj-cruiser.jpg',
    liked: false,
    newItem: false
  },
  {
    id: '0474584043',
    brand: 'Toyota',
    model: 'Rav4',
    year: 2019,
    color: 'white',
    category: 'offroader',
    class: 'crossover',
    image: './assets/images/toyota-rav4.jpg',
    liked: false,
    newItem: false
  },
  {
    id: '8480304426',
    brand: 'Porsche',
    model: '911 GT2 RS',
    year: null,
    color: 'red',
    class: 'sport',
    category: 'coupe',
    image: './assets/images/porsche-911-gt2.jpg',
    liked: false,
    newItem: false
  },
  {
    id: '0776681260',
    brand: 'Kenworth',
    model: 'T700',
    year: null,
    color: 'black',
    image: './assets/images/kenworth-t700.jpg',
    liked: false,
    newItem: false
  },
  {
    id: '8730522046',
    brand: 'Porsche',
    model: 'Boxster S',
    year: null,
    color: 'blue',
    class: 'sport',
    category: 'roadster',
    image: './assets/images/porsche-boxter.jpg',
    liked: false,
    newItem: false
  },
  {
    id: '5087979074',
    brand: 'BMW',
    model: 'X5',
    year: null,
    color: 'blue',
    category: 'offroader',
    liked: false,
    newItem: false
  },
  {
    id: '2825286862',
    brand: 'Honda',
    model: 'Integra Type R',
    year: null,
    color: 'black',
    category: 'sedan',
    liked: false,
    newItem: false
  },
  {
    id: '6693123606',
    brand: 'BMW',
    model: 'Z8',
    year: null,
    color: 'red',
    category: 'roadster',
    liked: false,
    newItem: false
  },
  {
    id: '0279543552',
    brand: 'Subaru',
    model: 'Impreza',
    year: null,
    color: 'blue',
    class: 'sport',
    category: 'sedan',
    liked: false,
    newItem: false
  },
  {
    id: '0183253615',
    brand: 'BMW',
    model: 'M3',
    year: null,
    color: 'white',
    category: 'coupe',
    liked: false,
    newItem: false
  },
  {
    id: '7464518654',
    brand: 'Aston Martin',
    model: 'DB5',
    year: null,
    color: 'green',
    category: 'coupe',
    liked: false,
    newItem: false
  },
  {
    id: '8198524721',
    brand: 'Jaguar',
    model: 'XK',
    year: null,
    color: 'red',
    category: 'coupe',
    liked: false,
    newItem: false
  },
  {
    id: '0776779607',
    brand: 'Volkswagen',
    model: 'Classical Bus',
    year: 1962,
    color: 'yellow',
    liked: false,
    newItem: false
  },
  {
    id: '7885466312',
    brand: 'Chevrolet',
    model: 'Corvette',
    year: 1957,
    color: 'red',
    class: 'retro',
    category: 'coupe',
    image: './assets/images/chevrolet-corvette.jpg',
    liked: false,
    newItem: false
  },
  {
    id: '4619734159',
    brand: 'Ford',
    model: 'Model B',
    year: 1932,
    color: 'yellow',
    category: 'coupe',
    liked: false,
    newItem: false
  },
  {
    id: '4249123539',
    brand: 'BMW',
    model: 'Z4',
    year: null,
    color: 'black',
    category: 'roadster',
    liked: false,
    newItem: false
  },
  {
    id: '6046771395',
    brand: 'Toyota',
    model: 'Corolla',
    year: null,
    color: 'black',
    category: 'sedan',
    liked: false,
    newItem: false
  },
  {
    id: '5244394239',
    brand: 'Bentley',
    model: 'Continental GT',
    year: 2010,
    color: 'red',
    category: 'coupe',
    liked: false,
    newItem: false
  },
  {
    id: '3495135933',
    brand: 'Ford',
    model: 'Mustang',
    year: 1964,
    color: 'white',
    category: 'coupe',
    liked: false,
    newItem: false
  },
  {
    id: '6289616465',
    brand: 'Dodge',
    model: 'Ram',
    year: null,
    color: 'black',
    category: 'pickup truck',
    image: './assets/images/dodge-ram.jpg',
    liked: false,
    newItem: false
  },
  {
    id: '5787095042',
    brand: 'Chevrolet',
    model: '3100 Wrecker',
    year: 1953,
    color: 'black',
    liked: false,
    newItem: false
  },
  {
    id: '8149093713',
    brand: 'Mercedes-Benz',
    model: 'SLS AMG',
    year: null,
    color: 'red',
    category: 'coupe',
    image: './assets/images/mercedes-amg.jpg',
    liked: true,
    newItem: false
  },
  {
    id: '1964343303',
    brand: 'Mitsubishi',
    model: 'Lancer Evolution VII WRC',
    year: null,
    color: 'red',
    category: 'sedan',
    liked: false,
    newItem: false
  },
  {
    id: '1977927518',
    brand: 'Audi',
    model: 'A1',
    year: 2010,
    color: 'blue',
    category: 'sedan',
    liked: false,
    newItem: false
  },
  {
    id: '8418804731',
    brand: 'Cadillac',
    model: 'Series 62',
    year: 1953,
    color: 'pink',
    category: 'coupe',
    liked: false,
    newItem: false
  },
  {
    id: '9335674445',
    brand: 'Ford',
    model: 'Thunderbird',
    year: 1955,
    color: 'red',
    category: 'coupe',
    image: './assets/images/ford-thunderbird.jpg',
    liked: false,
    newItem: false
  },
  {
    id: '6948076871',
    brand: 'AC Cars',
    model: 'Shelby Cobra 427 S/C',
    year: 1965,
    color: 'white',
    class: 'sport',
    category: 'roadster',
    image: './assets/images/shelby-cobra.jfif',
    liked: false,
    newItem: false
  },
  {
    id: '5359105976',
    brand: 'Land Rover',
    model: 'Range Rover sport',
    year: null,
    color: 'red',
    category: 'offroader',
    image: './assets/images/land-rover-range.jpg',
    liked: false,
    newItem: false
  },
  {
    id: '6522434240',
    brand: 'Ford',
    model: 'Raptor SuperCrew',
    year: null,
    color: 'blue',
    category: 'pickup truck',
    image: './assets/images/ford-raptor.jpg',
    liked: false,
    newItem: false
  },
  {
    id: '2948198567',
    brand: 'Mercedes-Benz',
    model: 'X-Class',
    year: null,
    color: 'red',
    category: 'pickup truck',
    image: './assets/images/mercedes-x-class.jpg',
    liked: false,
    newItem: false
  }
];

export const DEALERS: DealerItem[] = [
  {
    id: 'CHEVROLET',
    name: 'Chevrolet',
    amountOfCars: 3,
    country: 'United States',
    foundedIn: 1911,
    newRecord: false,
    headquarters: 'Detroit, Michigan'
  },
  {
    id: 'PAGANI',
    name: 'Pagani',
    amountOfCars: 1,
    country: 'Italy',
    foundedIn: 1992,
    newRecord: false,
    headquarters: 'San Cesario sul Panaro, MO'
  },
  {
    id: 'MCL',
    name: 'McLaren',
    amountOfCars: 1,
    country: 'United Kingdom',
    foundedIn: 1963,
    newRecord: false,
    headquarters: ''
  },
  {
    id: 'TOYOTA',
    name: 'Toyota',
    amountOfCars: 4,
    country: 'Japan',
    foundedIn: 1937,
    newRecord: false,
    headquarters: 'Toyota City'
  },
  {
    id: 'FORD',
    name: 'Ford',
    amountOfCars: 5,
    country: 'United States',
    foundedIn: 1903,
    newRecord: false,
    headquarters: 'Dearborn, Michigan'
  },
  {
    id: 'AUDI',
    name: 'Audi',
    amountOfCars: 2,
    country: 'Germany',
    foundedIn: 1909,
    newRecord: false,
    headquarters: 'Ingolstadt'
  },
  {
    id: 'JEEP',
    name: 'Jeep',
    amountOfCars: 1,
    country: 'United States',
    foundedIn: 1943,
    newRecord: false,
    headquarters: 'Toledo, Ohio'
  },
  {
    id: 'PORSCHE',
    name: 'Porsche',
    amountOfCars: 2,
    country: 'Germany',
    foundedIn: 1931,
    newRecord: false,
    headquarters: 'Stuttgart'
  },
  {
    id: 'KENWORTH',
    name: 'Kenworth',
    amountOfCars: 1,
    country: 'United States',
    foundedIn: 1923,
    newRecord: false,
    headquarters: 'Kirkland, Washington'
  },
  {
    id: 'BMW',
    name: 'BMW',
    amountOfCars: 4,
    country: 'Germany',
    foundedIn: 1916,
    newRecord: false,
    headquarters: 'Munich'
  },
  {
    id: 'HONDA',
    name: 'Honda',
    amountOfCars: 1,
    country: 'Japan',
    foundedIn: 1946,
    newRecord: false,
    headquarters: 'Minato, Tokyo'
  },
  {
    id: 'SUBARU',
    name: 'Subaru',
    amountOfCars: 1,
    country: 'Japan',
    foundedIn: 1953,
    newRecord: false,
    headquarters: 'Ebisu, Shibuya'
  },
  {
    id: 'AM',
    name: 'Aston Martin',
    amountOfCars: 1,
    country: 'United Kingdom',
    foundedIn: 1913,
    newRecord: false,
    headquarters: 'Gaydon, Warwickshire, England'
  },
  {
    id: 'JAGUAR',
    name: 'Jaguar',
    amountOfCars: 1,
    country: 'United Kingdom',
    foundedIn: 1922,
    newRecord: false,
    headquarters: 'Whitley, England'
  },
  {
    id: 'VW',
    name: 'Volkswagen',
    amountOfCars: 1,
    country: 'Germany',
    foundedIn: 1937,
    newRecord: false,
    headquarters: 'Wolfsburg'
  },
  {
    id: 'BENTLEY',
    name: 'Bentley',
    amountOfCars: 1,
    country: 'United Kingdom',
    foundedIn: 1919,
    newRecord: false,
    headquarters: 'Crewe, England'
  },
  {
    id: 'DODGE',
    name: 'Dodge',
    amountOfCars: 1,
    country: 'United States',
    foundedIn: 1900,
    newRecord: false,
    headquarters: 'Auburn Hills, Michigan'
  },
  {
    id: 'MB',
    name: 'Mercedes-Benz',
    amountOfCars: 2,
    country: 'Germany',
    foundedIn: 1926,
    newRecord: false,
    headquarters: 'Stuttgart'
  },
  {
    id: 'MITSUBISHI',
    name: 'Mitsubishi',
    amountOfCars: 1,
    country: 'Japan',
    foundedIn: 1870,
    newRecord: false,
    headquarters: 'Tokyo'
  },
  {
    id: 'CADILLAC',
    name: 'Cadillac',
    amountOfCars: 1,
    country: 'United States',
    foundedIn: 1902,
    newRecord: false,
    headquarters: 'Warren, Michigan'
  },
  {
    id: 'AC',
    name: 'AC Cars',
    amountOfCars: 1,
    country: 'United Kingdom',
    foundedIn: 1901,
    newRecord: false,
    headquarters: 'Thames Ditton, Surrey, England'
  },
  {
    id: 'LR',
    name: 'Land Rover',
    amountOfCars: 1,
    country: 'United Kingdom',
    foundedIn: 1978,
    newRecord: false,
    headquarters: 'Solihull, West Midlands, England'
  }
];
