import {ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger} from '@nestjs/common';
import { Request, Response } from 'express';
import {StandardResponse} from "../../utils/http-response/standard-response";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const customResponse: StandardResponse<any> = {
            status: status,
            message: exception.message,
        };
        response
            .status(status)
            .json(customResponse);
    }
}
