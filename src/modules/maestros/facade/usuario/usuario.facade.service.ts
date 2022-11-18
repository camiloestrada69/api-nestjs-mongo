import {Injectable} from '@nestjs/common';
import {UsuarioService} from "../../service/usuario/usuario.service";
import {UsuarioDTO} from "../../../model/dto/UsuarioDTO";
import {Usuario} from "../../../model/schema/usuario.schema";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import {UsuarioMapper} from "../../mapper/usuario.mapper";

@Injectable()
export class UsuarioFacadeService {
    usuarioService: UsuarioService;
    usuarioMapper: UsuarioMapper;
    constructor(usuarioService: UsuarioService, usuarioMapper: UsuarioMapper,
                @InjectMapper() private readonly classMapper: Mapper) {
        this.usuarioService = usuarioService;
        this.usuarioMapper = usuarioMapper;
    }
    
    public async getAll():Promise<UsuarioDTO[]>{
        return this.usuarioService.getAll();
    }

    public async crear(usuarioDto: UsuarioDTO):Promise<UsuarioDTO>{
        return this.usuarioService.crear(usuarioDto);
    }
    
    public async crearTransacion(usuarioDto: UsuarioDTO):Promise<UsuarioDTO>{

            const usuarioEntity = this.classMapper.map(usuarioDto, UsuarioDTO, Usuario);
            const usuarioCreado = await this.usuarioService.crearTransacion(usuarioEntity) as Usuario;
            const usuarioMapeado = await this.classMapper.map(usuarioCreado, Usuario, UsuarioDTO);
            return usuarioMapeado;
    }
}
