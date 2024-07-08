const knex = require("../database/knex")

class MovieTagsControllers{
    async create(request, response){
        const {name, user_id, note_id} = request.body;
        const noteExists = await knex("movie_notes").where('id',note_id)
        const userExists = await knex("users").where('id', user_id)
        if(noteExists.length && userExists.length != 0){
            const createTag = await knex("movie_tags").insert({
                name,
                user_id,
                note_id
            })
        }
        return response.json()
    }

    async delete(request, response){
        const { id } = request.params
        await knex("movie_tags").where({ id }).delete();
        return response.json();
    }

    async index(request, response) {
        const { id } = request.params
        const tags = await knex("movie_tags").where('user_id', id)
    
        return response.json(tags)
      }
}
    
module.exports = MovieTagsControllers
