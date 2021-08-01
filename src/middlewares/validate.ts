import { ArraySchema, object, SchemaLike } from 'joi';
import { Context, Next } from 'koa';
import { IMiddleware } from 'koa-router';
import { FieldError, FieldValidationError } from '../errors';

type RecordSchema = Partial<Record<string, SchemaLike>>

export interface SchemaMap {
  params?: RecordSchema,

  request?: {
    query?: RecordSchema | ArraySchema
    body?: RecordSchema | ArraySchema
    headers?: RecordSchema
  }

  response?: {
    body?: RecordSchema | ArraySchema
    headers?: RecordSchema
  }
}

export function validate(schema: SchemaMap): IMiddleware {
  return async (ctx: Context, next: Next) => {
    const valResult = object(schema).validate(ctx, {
      allowUnknown: true,
      abortEarly: false,
    });

    if (valResult.error) {
      throw new FieldValidationError(
        valResult.error.message,
        valResult.error.details.map<FieldError>((f) => ({
          message: f.message,
          path: f.path.map((pItem) => String(pItem)),
          type: f.type,
        })),
        valResult.error,
      );
    } else {
      await next();
    }
  };
}
