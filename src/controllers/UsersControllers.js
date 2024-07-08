const knex = require("../database/knex")

class UsersControllers{
    async create(request, response){
        const {name, email, password, avatar} = request.body
        const emailExists = await knex("users").where({email});
     
        if(emailExists.length == 0){
            const [usersCreate] = await knex("users").insert({
                name,
                email,
                password,
                avatar
            })
        }
        
        response.json()
    }
    
    async update(request, response){
        const { name, email, password, passwordOld} = request.body
        const { id } = request.params
        const [usersUpdate] = await knex("users").where({id});
        
        if(passwordOld == usersUpdate.password){
            await knex("users").where({id}).update({
                name: name,
                email: email,
                password: password
            })
        }
        response.json()

    }

    async delete(request, response){
        const { id } = request.params

        await knex("users").where({ id }).delete();
        return response.json();
    }

    async index(request, response){
        const users = await knex("users")
        return response.json(users);
    }

    async show(request, response){
        const { id } = request.params;
        const user = await knex("users").where({id});
        return response.json(user)
    }
}

module.exports = UsersControllers