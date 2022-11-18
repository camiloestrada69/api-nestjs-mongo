
import {ApiProperty} from "@nestjs/swagger";
import {AutoMap} from "@automapper/classes";
import {Types} from "mongoose";
import {IsNotEmpty, MaxLength} from "class-validator";

export class UsuarioDTO {

    @ApiProperty()
    @AutoMap()
    id: Types.ObjectId = null;

    @ApiProperty()
    @IsNotEmpty()
    @AutoMap()
    nombre: string;


    @ApiProperty()
    @MaxLength(50)
    @AutoMap()
    descripcion: string;

   /* withNombre(nombre){
        this.nombre = nombre;
        return this;
    }
    withDescripcion(descripcion){
        this.descripcion = descripcion;
        return this;
    }

    build() {
        const u = new UsuarioDTO()
            .withNombre(this.nombre)
            .withDescripcion(this.descripcion)
            .build();
        console.log('entro modelo builder')
        console.log(u)
        return u;
    }*/
}

