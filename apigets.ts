import axios from "npm:axios"
import {GraphQLError} from "graphql"
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";


const env=await load();

const api_key = Deno.env.get("api_key")||env.api_key;


export async function validatenumber(number:string){

try {
    const respuesta = await axios.get(`https://api.api-ninjas.com/v1/validatephone?number=${number}`,{
        headers:{'X-Api-Key': api_key}
    })      

    if(respuesta.data.is_valid==false) throw new GraphQLError("Telefono incorrecot")
     return respuesta.data.country;
} catch (error) {
    return new GraphQLError(error.message)
}
}

export async function getcapital(pais:string){
    try {
        const respuesta = await axios.get(`https://api.api-ninjas.com/v1/country?name=${pais}`,{
            headers:{'X-Api-Key': api_key}
        })
        console.log(respuesta.data)
        if(respuesta.data.length===0) throw new GraphQLError("Pais incorrecto")
         return respuesta.data[0].capital;
    } catch (error) {
        return new GraphQLError(error.message)
    }
}

export async function getcalidaddelaire(ciudad:string){
    try {
        const respuesta = await axios.get(`https://api.api-ninjas.com/v1/airquality?city=${ciudad}`,{
            headers:{'X-Api-Key': api_key}
        })
        if(respuesta.data.error) throw new GraphQLError("Ciudad incorrecta")
         return respuesta.data.overall_aqi;
    } catch (error) {
        return new GraphQLError(error.message)
    }
}