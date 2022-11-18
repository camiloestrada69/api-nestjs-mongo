import {Module} from "@nestjs/common";
import {UsuarioService} from './service/usuario/usuario.service';
import {UsuarioFacadeService} from './facade/usuario/usuario.facade.service';
import {UsuarioController} from "./controller/usuario/usuario.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {Usuario, UsuarioSchema} from "../model/schema/usuario.schema";
import {UsuarioMapper} from "./mapper/usuario.mapper";
import {UsuarioRepository} from "./repository/usuario.repository";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
    imports: [
      MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema },]),
      ClientsModule.register([
        {
          name: 'KAFKA',
          transport: Transport.KAFKA,
          options: {
            client: {
              brokers: ['localhost:9092']
            }
          }
        }
      ])],
    controllers: [UsuarioController],
    providers: [UsuarioService, UsuarioFacadeService, UsuarioMapper, UsuarioRepository]
})
export class MaestrosModule {}

