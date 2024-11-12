import { sql } from './db.js';

sql`
ALTER TABLE videos
    ALTER COLUMN id SET DATA TYPE VARCHAR(255);

`
.then(() => {
    console.log('Coluna agora é varchar');
})
.catch((error) => {
    console.error('Erro ao renomear coluna:', error);
});
