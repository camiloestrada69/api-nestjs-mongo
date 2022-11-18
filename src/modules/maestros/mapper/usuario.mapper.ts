import {Injectable} from "@nestjs/common";
import {Usuario} from "../../model/schema/usuario.schema";
import {UsuarioDTO} from "../../model/dto/UsuarioDTO";
import {AutomapperProfile, InjectMapper} from "@automapper/nestjs";
import {createMap, Mapper} from "@automapper/core";

@Injectable()
export class UsuarioMapper extends AutomapperProfile{


    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, Usuario, UsuarioDTO);
            createMap(mapper, UsuarioDTO, Usuario);
            //createMap(mapper, InventoryItemCreateDTO, InventoryItem, forMember((dest) => dest.id, ignore()));
        };
    }
}
