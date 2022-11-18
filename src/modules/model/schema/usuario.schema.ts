import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, SchemaTypes, Types} from 'mongoose';
import {AutoMap} from "@automapper/classes";


export type UsuarioDocument = Usuario;
@Schema()
export class Usuario {

    @Prop({ type: SchemaTypes.ObjectId})
    @AutoMap()
    id: Types.ObjectId = null;

    @Prop({ required: true, unique: true })
    @AutoMap()
    nombre: string;

    @Prop({ required: true })
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

    withId(id){
        this.id = id;
        return this;
    }

    build() {
        const u = new Usuario()
            .withId(this.id)
            .withNombre(this.nombre)
            .withDescripcion(this.descripcion)
            .build();
        console.log('entro modelo builder')
        console.log(u)
        return u;
    }*/

}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
