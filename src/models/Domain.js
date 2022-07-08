import Database from '../db/database.js';

async function readAll() {
    const db = await Database.connect();

    const sql = `
        SELECT 
            *
        FROM
            domain
    `;

    const domains = await db.all(sql);

    return domains;
};

async function create(domains) {
    const db = await Database.connect();

    const { id, domain } = domains;

    const sql = `
        INSERT INTO 
            domain (id, domain)
        VALUES
            (?, ?)
    `;

    db.run(sql, [id, domain]);
};

export default { create, readAll };