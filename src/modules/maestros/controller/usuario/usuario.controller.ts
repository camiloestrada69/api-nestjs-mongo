import {
    Body,
    ConflictException,
    Controller,
    ForbiddenException,
    Get,
    HttpException,
    HttpStatus, Inject,
    Post
} from "@nestjs/common";
import {UsuarioDTO} from "../../../model/dto/UsuarioDTO";
import {StandardResponse} from "../../../../utils/http-response/standard-response";
import {ApiTags} from "@nestjs/swagger";
import {UsuarioFacadeService} from "../../facade/usuario/usuario.facade.service";
import { ClientProxy, MessagePattern, Payload } from "@nestjs/microservices";

@ApiTags('Usuarios')
@Controller('/usuarios/')
export class UsuarioController {
    usuarioFacadeService: UsuarioFacadeService;
    constructor(usuarioFacadeService: UsuarioFacadeService,
                @Inject('KAFKA') private readonly kafka: ClientProxy) {
        this.usuarioFacadeService = usuarioFacadeService;
    }

    @Get()
    public async findAll(): Promise<StandardResponse<any[]>> {
        return {
            status: HttpStatus.OK,
            body: await this.usuarioFacadeService.getAll(),
            message: 'Consulta exitosa'
        };
    }

    @Post()
    public async crearUsuario(
        @Body() usuarioDto: UsuarioDTO,
    ): Promise<StandardResponse<UsuarioDTO>> {
        console.log(usuarioDto);
        return {
            status: HttpStatus.OK,
            body: await this.usuarioFacadeService.crear(usuarioDto),
        };
    }

    @Post('/crear-transacional')
    public async crearUsuarioTransacional(
        @Body() usuarioDto: UsuarioDTO,
    ): Promise<StandardResponse<UsuarioDTO>> {
        return {
            status: HttpStatus.OK,
            body: await this.usuarioFacadeService.crearTransacion(usuarioDto),
        };
    }

    @MessagePattern('my-topic')
    public messageCreate(@Payload() payload) {
        console.log(payload);
    }

    @Post('/send-message-kafka')
    public async emitirMensajeKafka(
      @Body() usuarioDto: UsuarioDTO,
    ): Promise<any> {
        return this.kafka.emit('my-topic', {
            status: HttpStatus.OK,
            body: usuarioDto,
        });
    }
}
