// import { model, Model, models, Schema, isValidObjectId, UpdateQuery } from "mongoose";
import { IRepository } from "../IRepository";
import CustomError from "../../Error/CustomError";
import { Repository } from "typeorm";
import Pizza from "../../Database/Entities/Pizza";

const INVALID_MONG_ID = "Invalid mongo id";

export default class AbstractRepository<T> implements IRepository<T> {
  protected _model: Repository<T>;
  // protected _modelName: string
  // protected _schema: Schema

  constructor(model: Repository<T>) {
    this._model = model;
    // this._modelName = modelName
    // this._model = models[this._modelName] || model(this._modelName, this._schema)
  }

  async findAll(): Promise<T[]> {
    return this._model.find();
  }

  async findOne(id: number): Promise<T | null> {
    // if (!isValidObjectId(_id)) throw new CustomError(INVALID_MONG_ID, 422);
    return this._model.findOne({ where: { id } } as T);
  }

  async create(obj: T): Promise<T> {
   const pizza = await this._model.create({ ...obj });
    await this._model.save(pizza)
    return pizza
  }

  async update(id: number, obj: T): Promise<T | null> {
    // if (!isValidObjectId(_id)) throw new CustomError(INVALID_MONG_ID, 422);
    return this._model.update(id, obj);
  }

  async delete(_id: string): Promise<T | null> {
    // if (!isValidObjectId(_id)) throw new CustomError(INVALID_MONG_ID, 422);
    if(!(await this._model.findOne(_id))) {
      throw new CustomError('Não existe', 400)
    }
    return this._model.delete(_id);
  }
}
