import { BadGatewayException, Injectable } from '@nestjs/common';
import { IBaseService } from './Ibase.service';
import { BaseEntity } from './base.model';

@Injectable()
export class BaseService<T extends BaseEntity> implements IBaseService<T> {
  constructor(private readonly _model) {}

  create(entity: any): Promise<string> {
    try {
      return new Promise<string>((resolve, reject) => {
        this._model
          .save(entity)
          .then(created => resolve(created.id))
          .catch(err => reject(err));
      });
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  getAll(): Promise<T[]> {
    try {
      return <Promise<T[]>>this._model.find();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  get(id: string): Promise<T> {
    try {
    } catch (error) {
      throw new BadGatewayException(error);
    }
    return <Promise<T>>this._model.findOneById(id);
  }

  delete(id: string): void {
    try {
      this._model.deleteById(id);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  update(entity: any): Promise<any> {
    try {
      return new Promise<any>((resolve, reject) => {
        this._model
          .findOneById(entity.id)
          .then(responseGet => {
            try {
              if (responseGet == null) reject('Not existing');
              const retrievedEntity: any = responseGet as any;
              this._model
                .save(retrievedEntity)
                .then(response => resolve(response))
                .catch(err => reject(err));
            } catch (e) {
              reject(e);
            }
          })
          .catch(err => reject(err));
      });
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
