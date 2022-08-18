import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/Car';
import { ErrorTypes } from '../../../errors/errorCatalog';
import { Model } from 'mongoose';
import { deleteMockWithId, carMock, carMockAll, carMockWithId } from '../../mocks/car.test';

describe('Car Model', () => {
	const carModel = new CarModel();

	before(() => {
		sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves(carMockAll);
		sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockWithId);
    sinon.stub(Model, 'deleteOne').resolves(deleteMockWithId);
	});

  after(() => {
		sinon.restore();
	});

	describe('creating a new car', () => {
		it('successfully', async () => {
			const newCar = await carModel.create(carMock);
			expect(newCar).to.be.deep.equal(carMockWithId);
		});
	});

  describe('searching all cars', () => {
    it('successfully', async () => {
      const carsFound = await carModel.read();
      expect(carsFound).to.be.deep.equal(carMockAll);
    });
  });

	describe('searching a specific car by _id', () => {
		it('successfully found', async () => {
			const carFound = await carModel.readOne(carMockWithId._id);
			expect(carFound).to.be.deep.equal(carMockWithId);
		});

		it('_id not found', async () => {
			try {
				await carModel.readOne('WrongId');
			} catch (error: any) {
				expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
			}
		});
	});

  describe('changing an existing car', () => {
		it('successfully', async () => {
			const carChange = await carModel.update(carMockWithId._id, carMock);
			expect(carChange).to.be.deep.equal(carMockWithId);
		});

		it('_id not found to change', async () => {
			try {
				await carModel.update('WrongId', carMock);
			} catch (error: any) {
				expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
			}
		});
  });

  describe('deleting a car', () => {
    it('_id not found', async () => {
			try {
				await carModel.delete('WrongId');
			} catch (error: any) {
				expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
			}
		});
	});
});
