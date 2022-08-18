import { IMotorcycle } from '../../interfaces/IMotorcycle';

const motorcycleMock:IMotorcycle = {
  model: 'Moto1',
  year: 2018,
  color: 'Grey',
  buyValue: 10000,
  category: 'Street',
  engineCapacity: 2000,
};

const motorcycleMockAll:(IMotorcycle & { _id:string })[] = [{
  _id: '62cf1fc6498565d94eba52cd',
  model: 'Moto1',
  year: 2018,
  color: 'Grey',
  buyValue: 10000,
  category: 'Street',
  engineCapacity: 2000,
},
{
  _id: '62cf1fc6498565d94eba56cd',
  model: 'Moto2',
  year: 2020,
  color: 'Blue',
  buyValue: 7000,
  category: 'Street',
  engineCapacity: 1000,
}];

const motorcycleMockWithId:IMotorcycle & { _id:string } = {
  _id: '62cf1fc6498565d94eba52cd',
  model: 'Moto1',
  year: 2018,
  color: 'Grey',
  buyValue: 10000,
  category: 'Street',
  engineCapacity: 2000,
};

const deleteMockWithId = {
  acknowledged: true,
  ok: 1,
  deletedCount: 1,
};

export { motorcycleMock, motorcycleMockAll, motorcycleMockWithId, deleteMockWithId };
