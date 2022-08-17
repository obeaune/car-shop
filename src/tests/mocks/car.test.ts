import { ICar } from '../../interfaces/ICar';

const carMock:ICar = {
  model: 'Carro1',
  year: 2015,
  color: 'Grey',
  buyValue: 200000,
  doorsQty: 4,
  seatsQty: 6,
};

const carMockAll:(ICar & { _id:string })[] = [{
  _id: '62cf1fc6498565d94eba52cd',
  model: 'Carro1',
  year: 2015,
  color: 'Grey',
  buyValue: 200000,
  doorsQty: 4,
  seatsQty: 7,
},
{
  _id: '62cf1fc6498565d94eba56cd',
  model: 'Carro2',
  year: 2007,
  color: 'White',
  buyValue: 50000,
  doorsQty: 4,
  seatsQty: 6,
}];

const carMockWithId:ICar & { _id:string } = {
  _id: '62cf1fc6498565d94eba52cd',
  model: 'Carro1',
  year: 2015,
  color: 'Grey',
  buyValue: 200000,
  doorsQty: 4,
  seatsQty: 6,
};

const deleteMockWithId = {
  acknowledged: true,
  ok: 1,
  deletedCount: 1,
};

export { carMock, carMockAll, carMockWithId, deleteMockWithId };
