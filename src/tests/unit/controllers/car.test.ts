import { expect } from 'chai';
import * as sinon from 'sinon';
import { NextFunction, Request, Response } from 'express';
import { carMock, carMockWithId, carMockAll } from '../../mocks/car.test';
import CarController from '../../../controllers/car';
import CarService from '../../../services/car';
import CarModel from '../../../models/Car';


describe('Car Controller', () => {
  const carModel = new CarModel()
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request; 
  const res = {} as Response;

  before(() => {
    sinon.stub(carService, 'create').resolves(carMock);
    sinon.stub(carService, 'read').resolves(carMockAll);
    sinon.stub(carService, 'readOne').resolves(carMock);
    sinon.stub(carService, 'update').resolves(carMockWithId);
    sinon.stub(carService, 'delete').resolves();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  })

  describe('creating a new car', () => {
    it('successfully', async () => {
      req.body = carMock;
      await carController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });

  describe('find all cars existing', () => {
    it('successfully', async () => {
      await carController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockAll));
    });
  });

  describe('find a specific car by _id', () => {
    it('successfully', async () => {
      req.params = { id: carMockWithId._id };
      await carController.readOne(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });

  describe('update an existing car', () => {
    it('successfully', async () => {
      req.params = { id: carMockWithId._id }
      req.body = carMock;
      await carController.update(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('delete a car', () => {
    it('successfully', async () => {
      req.params = { id: carMockWithId._id }
      await carController.delete(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });
});
