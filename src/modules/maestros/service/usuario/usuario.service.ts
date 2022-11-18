import {
    ConflictException,
    ForbiddenException,
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException
} from '@nestjs/common';
import {Usuario} from "../../../model/schema/usuario.schema";
import {InjectConnection, InjectModel} from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import {HydratedDocument, Model} from 'mongoose';
import {UsuarioDTO} from "../../../model/dto/UsuarioDTO";
import {UsuarioRepository} from "../../repository/usuario.repository";
import {Utils} from "../../../../utils/clasificadorError";

@Injectable()
export class UsuarioService {

    usuarioRepository: UsuarioRepository;
    private utils: Utils;

    constructor(@InjectModel(Usuario.name) private usuarioModel: Model<Usuario>,
                @InjectConnection() private readonly connection: mongoose.Connection,
                usuarioRepository: UsuarioRepository) {
        this.usuarioRepository = usuarioRepository;
        this.utils = new Utils()

    }

    public async crear(usuarioDto: UsuarioDTO): Promise<UsuarioDTO> {
        return await this.usuarioRepository.create(usuarioDto);
    }

    public async getAll(): Promise<UsuarioDTO[]> {
        return await this.usuarioRepository.getAll();
    }


    public async crearTransacion(usuario: Usuario): Promise<Usuario>{
        const session = await this.connection.startSession();
        session.startTransaction();
        let user: HydratedDocument<Usuario, {}, {}>[];
        try {
            const usuarioConsultado = await this.usuarioModel
                .findById('636564fbf579dabb47be2043')
                .session(session);
            if (!usuarioConsultado) {
                throw new ConflictException('El usuario no existe');
            }
            user = await this.usuarioModel.create([usuario], { session: session });
            await session.commitTransaction();
            await session.endSession();
            return user[0];
        } catch (e) {
            await session.abortTransaction();
            await session.endSession();
            this.utils.calisificarError(e);
        }
    }

}
