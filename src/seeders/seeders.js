import { resolve } from 'path';
import { readFileSync} from 'fs';
import Domain from '../models/Domain.js';

async function up () {
    const file = resolve(process.cwd(), 'src', 'seeders', 'seeders.json');

    const content = JSON.parse(readFileSync(file));

    for (const domains of content.domains) {
        await Domain.create(domains);
    };
};

export default { up };