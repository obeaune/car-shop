import { expect } from 'chai';
import * as sinon from 'sinon';
import { NextFunction, Request, Response } from 'express';
import { motorcycleMock, motorcycleMockWithId, motorcycleMockAll } from '../../mocks/motorcycle.test';
import MotorcycleController from '../../../controllers/motorcycle';
import MotorcycleService from '../../../services/motorcycle';
import MotorcycleModel from '../../../models/Motorcycle';


describe('Motorcycle Controller', () => {
  const motorcycleModel = new MotorcycleModel()
  const motorcycleService = new MotorcycleService(motorcycleModel);
  const motorcycleController = new MotorcycleController(motorcycleService);

  const req = {} as Request; 
  const res = {} as Response;

  before(() => {
    sinon.stub(motorcycleService, 'create').resolves(motorcycleMock);
    sinon.stub(motorcycleService, 'read').resolves(motorcycleMockAll);
    sinon.stub(motorcycleService, 'readOne').resolves(motorcycleMock);
    sinon.stub(motorcycleService, 'update').resolves(motorcycleMockWithId);
    sinon.stub(motorcycleService, 'delete').resolves();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  })

  describe('creating a new motorcycle', () => {
    it('successfully', async () => {
      req.body = motorcycleMock;
      await motorcycleController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMock)).to.be.true;
    });
  });

  describe('find all motorcycles existing', () => {
    it('successfully', async () => {
      await motorcycleController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockAll));
    });
  });

  describe('find a specific motorcycle by _id', () => {
    it('successfully', async () => {
      req.params = { id: motorcycleMockWithId._id };
      await motorcycleController.readOne(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMock)).to.be.true;
    });
  });

  describe('update an existing motorcycle', () => {
    it('successfully', async () => {
      req.params = { id: motorcycleMockWithId._id }
      req.body = motorcycleMock;
      await motorcycleController.update(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });
  });

  describe('delete a motorcycle', () => {
    it('successfully', async () => {
      req.params = { id: motorcycleMockWithId._id }
      await motorcycleController.delete(req, res);
      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith()).to.be.true;
    });
  });
});
