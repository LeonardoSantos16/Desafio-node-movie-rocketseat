const knex = require("../database/knex")

class MovieNotesControllers{
    async create(request, response){
        const { title, description, rating } = request.body;
        const user_id = request.user.id;
        const user = await knex("users").where('id', user_id);
        if(user.length != 0){
            const [createNotes] = await knex("movie_notes").insert({
                title,
                description,
                user_id,
                rating
            })
        }
        
        return response.json()
    }

    async show(request, response){
        const { id } = request.params
        const movieNotes = await knex("movie_notes").where({ id }).first();
        const movieTags = await knex("movie_tags").where({ note_id: id}).orderBy("name");
        return response.json({
            ...movieNotes,
            movieTags
        });
    }
    
    async delete(request, response){
        const { id } = request.params

        await knex("Movie_notes").where({ id }).delete();
        return response.json();
    }
    
}
module.exports = MovieNotesControllers
