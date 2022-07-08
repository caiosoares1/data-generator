import Migration from '../migrations/migration.js';
import Seed from '../seeders/seeders.js';

async function load() {
  await Migration.up();
  await Seed.up();
}

load();