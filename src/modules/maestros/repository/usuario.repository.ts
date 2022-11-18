import {Injectable} from "@nestjs/common";
import {Usuario} from "../../model/schema/usuario.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class UsuarioRepository {
    constructor(@InjectModel(Usuario.name) private usuarioModel: Model<Usuario>) {}

    async create(usuario: Usuario): Promise<Usuario> {
        return await this.usuarioModel.create(usuario)
    }

    async getAll(): Promise<Usuario[]> {
        return this.usuarioModel.find({});
    }

    async update(usuario): Promise<Usuario> {
        return this.usuarioModel.findByIdAndUpdate(usuario.id, usuario);
    }
}
