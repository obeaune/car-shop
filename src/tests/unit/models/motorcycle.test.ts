import { expect } from 'chai';
import sinon from 'sinon';
import MotorcycleModel from '../../../models/Motorcycle';
import { ErrorTypes } from '../../../errors/errorCatalog';
import { Model } from 'mongoose';
import { 
  motorcycleMock,
  motorcycleMockAll,
  motorcycleMockWithId,
  deleteMockWithId,
 } from '../../mocks/motorcycle.test';

describe('Motorcycle Model', () => {
	const motorcycleModel = new MotorcycleModel();

	before(() => {
		sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'find').resolves(motorcycleMockAll);
		sinon.stub(Model, 'findOne').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'deleteOne').resolves(deleteMockWithId);
	});

  after(() => {
		sinon.restore();
	});

	describe('creating a new motorcycle', () => {
		it('successfully', async () => {
			const newMotorcycle = await motorcycleModel.create(motorcycleMock);
			expect(newMotorcycle).to.be.deep.equal(motorcycleMockWithId);
		});
	});

  describe('searching all motorcycles', () => {
    it('successfully', async () => {
      const motorcyclesFound = await motorcycleModel.read();
      expect(motorcyclesFound).to.be.deep.equal(motorcycleMockAll);
    });
  });

	describe('searching a specific motorcycle by _id', () => {
		it('successfully found', async () => {
			const motorcycleFound = await motorcycleModel.readOne(motorcycleMockWithId._id);
			expect(motorcycleFound).to.be.deep.equal(motorcycleMockWithId);
		});

		it('_id not found', async () => {
			try {
				await motorcycleModel.readOne('WrongId');
			} catch (error: any) {
				expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
			}
		});
	});

  describe('changing an existing motorcycle', () => {
		it('successfully', async () => {
			const motorcycleChange = await motorcycleModel
        .update(motorcycleMockWithId._id, motorcycleMock);
			expect(motorcycleChange).to.be.deep.equal(motorcycleMockWithId);
		});

		it('_id not found to change', async () => {
			try {
				await motorcycleModel.update('WrongId', motorcycleMock);
			} catch (error: any) {
				expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
			}
		});
  });

  describe('deleting a motorcycle', () => {
    it('_id not found', async () => {
			try {
				await motorcycleModel.delete('WrongId');
			} catch (error: any) {
				expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
			}
		});
	});
});
