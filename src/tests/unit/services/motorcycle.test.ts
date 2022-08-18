import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/errorCatalog';
import MotorcycleModel from '../../../models/Motorcycle';
import MotorcycleService from '../../../services/motorcycle';
import { motorcycleMock, motorcycleMockWithId, motorcycleMockAll } from '../../mocks/motorcycle.test';

describe('Motorcycle Service', () => {
	const motorcycleModel = new MotorcycleModel();
	const motorcycleService = new MotorcycleService(motorcycleModel);

	before(() => {
		sinon.stub(motorcycleModel, 'create').resolves(motorcycleMockWithId);
    sinon.stub(motorcycleModel, 'read').resolves(motorcycleMockAll);
		sinon.stub(motorcycleModel, 'readOne')
      .onCall(0).resolves(motorcycleMockWithId)
      .onCall(1).resolves(null)
      .onCall(2).resolves(motorcycleMockWithId)
      .onCall(3).resolves(motorcycleMockWithId)
      .onCall(4).resolves(motorcycleMockWithId); 
    sinon.stub(motorcycleModel, 'update').resolves(motorcycleMockWithId);
    sinon.stub(motorcycleModel, 'delete').resolves(motorcycleMockWithId);
	});

	after(() => {
		sinon.restore()
	});

	describe('creating a new motorcycle', () => {
		it('successfully', async () => {
			const motorcycleCreated = await motorcycleService.create(motorcycleMock);
			expect(motorcycleCreated).to.be.deep.equal(motorcycleMockWithId);
		});

		it('failure', async () => {
			try {
				await motorcycleService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
	});

  describe('find all motorcycles', () => {
    it('successfully', async () => {
      const motorcyclesFound = await motorcycleService.read();
      expect(motorcyclesFound).to.be.deep.equal(motorcycleMockAll);
    });
  });

	describe('find a specific motorcycle by _id', () => {
		it('successfully', async () => {
			const motorcycleFound = await motorcycleService.readOne(motorcycleMockWithId._id);
			expect(motorcycleFound).to.be.deep.equal(motorcycleMockWithId);
		});

		it('failure', async () => {
			try {
				await motorcycleService.readOne(motorcycleMockWithId._id);
			} catch (error:any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

  describe('update an existing motorcycle', () => {
		it('successfully', async () => {
		  const updatedMotorcycle = await motorcycleService.update(motorcycleMockWithId._id, motorcycleMock);
		  expect(updatedMotorcycle).to.be.deep.equal(motorcycleMockWithId);
		});

    it('failure', async () => {
      try {
				await motorcycleService.update('WrongId', motorcycleMockWithId);
			} catch (error: any) {
				expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
			}
    });
  });

  describe('delete a motorcycle', () => {
		it('successfully', async () => {
			const deletedMotorcycle = await motorcycleService.delete(motorcycleMockWithId._id);
			expect(deletedMotorcycle).to.be.deep.equal(motorcycleMockWithId);
		});

    it('_id not found', async () => {
      try {
        await motorcycleService.delete('WrongId');
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
      }
    });
  });
});
