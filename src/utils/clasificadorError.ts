import {ConflictException, ForbiddenException, InternalServerErrorException, NotFoundException} from "@nestjs/common";

export class Utils{

    public calisificarError(error) {
        switch (error.status) {
            case 403:
                throw new ForbiddenException('Forbiden');
                break;
            case 404:
                throw new NotFoundException(error.message);
                break;
            case 409:
                throw new ConflictException(error.message);
                break;
            default:
                throw new InternalServerErrorException('Error con el servidor')
                break;
        }
    }
}
