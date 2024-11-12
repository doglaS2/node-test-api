import { randomUUID } from "crypto"
import {sql} from './db.js'

export class DatabasePostgres{

    #videos = new Map()



    async list(search) {

        let videos

        if(search){
            videos = await sql`select * from videos where title ilike ${ '%' + search + '%'}`
        }else{
            videos = await sql`select * from videos`
        }

        return videos
    
    }



    async create(video){

        const videoId = randomUUID()

        const {title, describe, duration} = video

        await sql`insert into videos (id, title, describe, duration) VALUES (${videoId}, ${title}, ${describe}, ${duration})`

    }



    async update(id, video){

        const {title, describe, duration} = video

        await sql`update videos set title = ${title}, describe = ${describe}, duration = ${duration} WHERE id = ${id}`
        

    }



    async delete(id){

        await sql`delete from videos where id = ${id}`
     
    }

}