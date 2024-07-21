const knex = require("../database/knex")
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");
const {hash} = require("bcryptjs");
class UsersControllers{
    async create(request, response){
        const {name, email, password, avatar} = request.body
        const [emailExists] = await knex("users").where({ email });
        const hashedPassword = await hash(password, 8);
        if(emailExists){
            throw new AppError("Este email já está em uso", 401);
          }
        
            const [usersCreate] = await knex("users").insert({
                name,
                email,
                Password: hashedPassword,
                avatar
            })
        
        response.json()
    }
    
    async update(request, response){
        const { name, email, passwordOld} = request.body;
        let { password } = request.body;
        const id = request.user.id;
        const  [ usersUpdate ] = await knex("users").where({ id });
       
        if(!usersUpdate) {
            throw new AppError("Usuário não encontrado")
        }
      
        if(password && !passwordOld) {
            
            throw new AppError("Você precisa informar a senha antiga para definir a nova senha")
        }
      
        if(password && passwordOld) {
            const checkOldPassword = await compare(passwordOld, usersUpdate.password)
            if(!checkOldPassword) {
    
              throw new AppError("A senha antiga não confere.")
            }
      
            password = await hash(password, 8)
           }


        await knex("users").where({ id }).update({
            name,
            email,
            password
        });
        return response.json();
    }

    async delete(request, response){
        const  id = request.user.id;

        await knex("users").where({ id }).delete();
        return response.json();
    }

    async index(request, response){
        const users = await knex("users")
        return response.json(users);
    }

    async show(request, response){
        const  id = request.user.id;
        const user = await knex("users").where({ id });
        return response.json(user)
    }
}

module.exports = UsersControllers