import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/errorCatalog';
import CarModel from '../../../models/Car';
import CarService from '../../../services/car';
import { carMock, carMockWithId, carMockAll } from '../../mocks/car.test';

describe('Car Service', () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);

	before(() => {
		sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'read').resolves(carMockAll);
		sinon.stub(carModel, 'readOne')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null)
      .onCall(2).resolves(carMockWithId); 
    sinon.stub(carModel, 'update').resolves(carMockWithId);
    sinon.stub(carModel, 'delete').resolves();
	});

	after(() => {
		sinon.restore()
	});

	describe('creating a new car', () => {
		it('successfully', async () => {
			const carCreated = await carService.create(carMock);
			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('failure', async () => {
			try {
				await carService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
	});

  describe('find all cars', () => {
    it('successfully', async () => {
      const carsFound = await carService.read();
      expect(carsFound).to.be.deep.equal(carMockAll);
    });
  });

	describe('find a specific car by _id', () => {
		it('successfully', async () => {
			const carFound = await carService.readOne(carMockWithId._id);
			expect(carFound).to.be.deep.equal(carMockWithId);
		});

		it('failure', async () => {
			try {
				await carService.readOne(carMockWithId._id);
			} catch (error:any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

  describe('update an existing car', () => {
    it('failure', async () => {
      try {
				await carService.update('WrongId', carMockWithId);
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
    });
  });

  describe('delete a car', () => {
    it('_id not found', async () => {
      try {
        await carService.delete('WrongId');
      } catch (error: any) {
        expect(error.message).to.be.eq('EntityNotFound');
      }
    });
  });
});
