import { getcalidaddelaire, getcapital, validatenumber } from "../apigets.ts";
import { ModeloPerson } from '../db/persons.ts';
import { GraphQLError } from 'graphql';
import { Person } from '../types.ts';

export const Mutation={
    addPerson: async(_:unknown,
    args:{name:string,phone:string}
    ):Promise<Person>=>{
        const existe = await ModeloPerson.findOne({phone:args.phone})
        if(existe) throw new GraphQLError("Numero ya existente en la base de datos")
        const pais= await validatenumber(args.phone)
    if(pais=="Request failed with status code 400")throw new GraphQLError("Numero de telefono incorrecto")
        const nuevaPerson= new ModeloPerson({
            name:args.name,
            phone:args.phone,
            country:pais,

        })
        await nuevaPerson.save()
        return ({
            id:nuevaPerson._id,
            name:args.name,
            phone:args.phone,
            country:pais,
            
        })
    },
    deletePerson: async(_:unknown,
        args:{id:string}
    ):Promise<Person>=>{
        const eliminado = await ModeloPerson.findByIdAndDelete(args.id)
        if(!eliminado) throw new GraphQLError("No se ha encontrado ninguna Perosna con ese id")
            return ({
                id:eliminado._id,
                name:eliminado.name,
                phone:eliminado.phone,
                country:eliminado.country,
                })
    },
    updatePerson: async(_:unknown,
        args:{id:string,name:string,phone:string}
    ):Promise<Person>=>{
        const eliminado = await ModeloPerson.findById(args.id)
        if(!eliminado) throw new GraphQLError("No se ha encontrado ninguna Perosna con ese id")
        if(!args.name&&!args.phone) throw new GraphQLError("Es necesario al menos un campo para actualizar la Persona")

        if(!args.name){
            const existe = await ModeloPerson.findOne({phone:args.phone})
            if(existe) throw new GraphQLError("Numero ya existente en la base de datos")
            const pais= await validatenumber(args.phone)
        if(pais=="Request failed with status code 400")throw new GraphQLError("Numero de telefono incorrecto")
            const actualizado= await ModeloPerson.findByIdAndUpdate(args.id,{phone:args.phone,pais:pais})
        return ({
            id:actualizado?._id,
            name:actualizado?.name,
            phone:args.phone,
            country:pais,
            })
        }

        if(!args.phone){
        const actualizado= await ModeloPerson.findByIdAndUpdate(args.id,{name:args.name})
        return ({
            id:actualizado?._id,
            name:args.name,
            phone:actualizado?.phone,
            country:actualizado?.country,
            })
        }
        const existe = await ModeloPerson.findOne({phone:args.phone})
        if(existe) throw new GraphQLError("Numero ya existente en la base de datos")
        const pais= await validatenumber(args.phone)
    if(pais=="Request failed with status code 400")throw new GraphQLError("Numero de telefono incorrecto")
        const actualizado= await ModeloPerson.findByIdAndUpdate(args.id,{phone:args.phone,pais:pais,name:args.name})
    return ({
        id:actualizado?._id,
        name:args.name,
        phone:args.phone,
        country:pais,
        })
    }

}