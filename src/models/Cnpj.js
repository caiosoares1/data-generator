import Database from '../db/database.js';

const create_array = (total, numero) => Array.from(Array(total), () => number_random(numero));
const number_random = (number) => (Math.round(Math.random() * number));
const mod = (dividendo, divisor) => Math.round(dividendo - (Math.floor(dividendo / divisor) * divisor));

async function read(id){
    const db = await Database.connect();
  
    const sql = `
      SELECT
        c.cnpj
      FROM
        cnpj as c 
      WHERE
        id = ?
    `;
  
    const cnpjid = await db.get(sql, [id]);
  
    return cnpjid;
};

async function create(cnpj) {
    const array_lenght = 8;
    const n = 9;
    const [n1, n2, n3, n4, n5, n6, n7, n8] = create_array(array_lenght, n);
    const n9 = 0;
    const n10 = 0;
    const n11 = 0;
    const n12 = 1;
    
    let d1 = n12 * 2 + n11 * 3 + n10 * 4 + n9 * 5 + n8 * 6 + n7 * 7 + n6 * 8 + n5 * 9 + n4 * 2 + n3 * 3 + n2 * 4 + n1 * 5;
    d1 = 11 - (mod(d1, 11));
    if (d1 >= 10) d1 = 0;

    let d2 = d1 * 2 + n12 * 3 + n11 * 4 + n10 * 5 + n9 * 6 + n8 * 7 + n7 * 8 + n6 * 9 + n5 * 2 + n4 * 3 + n3 * 4 + n2 * 5 + n1 * 6;
    d2 = 11 - (mod(d2, 11));
    if (d2 >= 10) d2 = 0;

    if (cnpj === "mascara") {
        const db = await Database.connect()

        const cnpj = `${n1}${n2}.${n3}${n4}${n5}.${n6}${n7}${n8}/${n9}${n10}${n11}${n12}-${d1}${d2}`;
    
        const CNPJ = cnpj;
    
        const sql = `
          INSERT INTO 
            cnpj (CNPJ)
          VALUES
            (?)
        `;
    
        const {lastID} = await db.run(sql, [CNPJ]);
    
        return read(lastID);
    }else{
        const db = await Database.connect()
        
        const cnpj = `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${n10}${n11}${n12}${d1}${d2}`;

        const CNPJ = cnpj;

        const sql = `
          INSERT INTO 
            cnpj (CNPJ)
          VALUES
            (?)
        `;

        const {lastID} = await db.run(sql, [CNPJ]);

        return read(lastID);
    };
};

export default {create, read};
