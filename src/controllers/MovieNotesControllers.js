const knex = require("../database/knex")

class MovieNotesControllers{
    async create(request, response){
        const { title, description, tags, rating } = request.body;
        const user_id = request.user.id;
        
        
        const [note_id] = await knex("movie_notes").insert({
            title,
            description,
            user_id,
            rating
        })
        console.log(tags);
        const tagsInsert = tags.map(name => {
            return {
              note_id,
              name,
              user_id
            }
          })
      
          await knex("movie_tags").insert(tagsInsert)
        
        return response.json()
    }

    async show(request, response){
        const { id } = request.params
        const user_id = request.user.id;
        const movieNotes = await knex("movie_notes").where({ id }).first();
        const movieTags = await knex("movie_tags").where({ note_id: id}).orderBy("name");
        const movieUser = await knex("users").select("users.name").where("users.id", user_id);
        return response.json({
            ...movieNotes,
            movieTags,
            movieUser
        });
    }

    async index(request, response){
        const { title } = request.query;
        const user_id = request.user.id;
        //const notes = await knex("movie_notes").where('user_id', user_id)
        let notes;
        if(title){
            console.log(title)
            notes = await knex("movie_notes").where({ user_id }).whereLike("title", `%${title}%`).orderBy("title");
        }else{
            console.log("sem title")
            notes = await knex("movie_notes").where({ user_id }).orderBy("title");
        }
        
        

        const userTags = await knex("movie_tags").where({ user_id })
        const notesWhithTags = notes.map(note => {
            const noteTags = userTags.filter(tag => tag.note_id === note.id)
            return {
                ...note,
                tags: noteTags
              }
            })
        return response.json(notesWhithTags);
    }
    
    async delete(request, response){
        const { id } = request.params

        await knex("Movie_notes").where({ id }).delete();
        return response.json();
    }
    
}
module.exports = MovieNotesControllers
