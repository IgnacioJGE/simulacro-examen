
export const typeDefs = `#graphql
type Person{
    id:ID!,
    name:String!,
    phone:String!,
    country:String!,
    overall_aqi:Int
}
type Query{
    getPersons:[Person!]!
    getPerson(id:ID!):Person!
}
type Mutation{
    addPerson(name:String!phone:String!):Person!
    deletePerson(id:ID!):Person!
    updatePerson(id:ID!,name:String,phone:String):Person!

}
`;