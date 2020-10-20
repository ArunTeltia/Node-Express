import { UseCase } from 'core/definition';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { logger, ILogger } from 'src/utils';

type AwaitHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

/**
 * awaitHandlerFactory wraps the given middleware into async
 * handler and returns it to the caller
 * @param {RequestHandler} middleware
 * @return {AwaitHandler}
 */
export function awaitHandlerFactory(middleware: RequestHandler): AwaitHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await middleware(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

/**
 * BaseController is an abstract class which every controller shall extend
 *
 * This abstract class has concrete implementation for multiple methods
 * which can be used by the child classes
 */
abstract class BaseController<T extends UseCase = UseCase> {
  protected logger: ILogger;

  /**
   * @param {T} usecase
   */
  constructor(protected usecase: T) {
    this.logger = logger.child({
      controller: this.constructor.name.toString(),
    });
  }

  /**
   * processRequest is an abstract method which should have a
   * concrete implementation in the child class
   *
   * This method should be used to process requests received from the
   * router
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  protected abstract async processRequest(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;

  /**
   * requestHandler returns the handler of the current controller
   * @return {RequestHandler}
   */
  public requestHandler(): RequestHandler {
    return awaitHandlerFactory(this.processRequest.bind(this));
  }

  /**
   * ok sends a 200 response to the http client and also
   * sends the generated reponse if any
   * @param {Response} res
   * @param {T} dto
   * @return {Response<unknown>}
   */
  protected ok<T>(res: Response, dto?: T): Response<unknown> {
    if (dto) return res.status(200).json(dto);
    return res.sendStatus(200);
  }

  /**
   * created sends a 201 response to the http client and also
   * sends the generated reponse if any
   * @param {Response} res
   * @param {T} payload
   * @return {Response<unknown>}
   */
  protected created<T>(res: Response, payload?: T): Response<unknown> {
    if (payload) return res.status(201).json(payload);
    return res.sendStatus(201);
  }

  /**
   * fail sends a 500 response to the http client and
   * also sends error if any
   * @param {Response} res
   * @param {Error | string} error
   * @return {Response<unknown>}
   */
  protected fail(res: Response, error: Error | string): Response<unknown> {
    return res.status(500).json({
      message: error.toString(),
    });
  }

  /**
   * badRequest sends a 400 response to the http client along with the
   * passed message
   * @param {Response} res
   * @param {string | undefined} message
   * @return {Response<unknown>}
   */
  protected badRequest(res: Response, message?: string): Response<unknown> {
    return BaseController.jsonResponse(res, 400, {
      message: message || 'bad requst',
    });
  }

  /**
   * unauthorized sends a 401 response to the http client along
   * with the message
   * @param {Response} res
   * @param {string | undefined} message
   * @return {Response<unknown>}
   */
  protected unauthorized(res: Response, message?: string): Response<unknown> {
    return BaseController.jsonResponse(res, 401, {
      message: message || 'Unauthorized',
    });
  }

  /**
   * forbidden sends a 403 response to the http client along
   * with the message
   * @param {Response} res
   * @param {string | undefined} message
   * @return {Response<unknown>}
   */
  protected forbidden(res: Response, message?: string): Response<unknown> {
    return BaseController.jsonResponse(res, 403, {
      message: message || 'Forbidden',
    });
  }

  /**
   * notFound sends a 404 response to the http client along witht he message
   * @param {Response} res
   * @param {string | undefined} message
   * @return {Response<unknown>}
   */
  protected notFound(res: Response, message?: string): Response<unknown> {
    return BaseController.jsonResponse(res, 404, {
      message: message || 'Not found',
    });
  }

  /**
   * jsonResponse is a wrapper over
   * ```ts
   * res.status(code).json(payload)
   * ```
   * and is used internally to send the responses
   * the client
   * @param {Response} res
   * @param {number} code
   * @param {Record<string, unknown>} payload
   * @return {Response<unknown>}
   */
  protected static jsonResponse(
    res: Response,
    code: number,
    payload: Record<string, unknown>,
  ): Response<unknown> {
    return res.status(code).json(payload);
  }
}

export default BaseController;
