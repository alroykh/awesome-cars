import { CarItem } from 'src/app/shared/modules/car-item/car-item.interface';
import { CARS } from './../../assets/data/data.constants';

export function getUniqueId(): string {
  let result = '';
  const symbols = '0123456789';
  const maxPosition = symbols.length - 1;
  for (let i = 0; i < 10; ++i) {
    const position = Math.floor(Math.random() * maxPosition);
    result = result + symbols.substring(position, position + 1);
  }

  // tslint:disable-next-line:no-unused-expression
  result ? !CARS.some((el: CarItem) => el.id === result) : getUniqueId();
  return result;
}
