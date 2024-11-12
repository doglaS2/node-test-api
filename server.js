import {fastify} from 'fastify';
//import { DatabaseMemory } from './database-memory.js';
import { describe } from 'node:test';
import { DatabasePostgres } from './databasePostgres.js';

const server = fastify();

const database = new DatabasePostgres()



server.post('/videos', async (request, reply) => {

    const {title, describe, duration} = request.body

    await database.create({
        title: title,
        describe: describe,
        duration: duration
    })

    console.log(database.list())

    return reply.status(201).send()

})




 server.get('/videos', async (request) => {

    const search = request.query.search
    console.log(search)


    const videos = await database.list(search)

    return videos

})




server.put('/videos/:id', async (request, reply) => {

    const videoId = request.params.id
    const {title, describe, duration} = request.body

    await database.update(videoId, {
        title,
        describe,
        duration,
    })

    return reply.status(204).send()

})






server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})




server.listen({
    port: process.env.PORT ?? 3333,
})
