import { Person } from '../types.ts';
import { ModeloPerson } from '../db/persons.ts';
import { GraphQLError } from 'graphql';
import { getcalidaddelaire, getcapital } from "../apigets.ts";
export const Query={

getPerson: async(_:unknown,
    args:{id:string}
):Promise<Person>=>{
    const existe= await ModeloPerson.findById(args.id)
    if(!existe) throw new GraphQLError("No existe persona con ese id")
     const capital= await getcapital(existe.country)
    const calidad= await getcalidaddelaire(capital)
        return ({
            id:existe?._id,
            name:existe?.name,
            phone:existe.phone,
            country:existe.country,
            overall_aqi:calidad
            })
},
getPersons: async():Promise<Person[]>=>{
    const peronas= await ModeloPerson.find()
    const arrayperosnas:Person[]=[]
    for (let index = 0; index < peronas.length; index++) {
        const capital= await getcapital(peronas[index].country)
        const calidad= await getcalidaddelaire(capital)
        arrayperosnas.push({
            id:peronas[index]._id,
            name:peronas[index].name,
            phone:peronas[index].phone,
            country:peronas[index].country,
            overall_aqi:calidad   
        })
        
    }
    return arrayperosnas
}

}