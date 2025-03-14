const db = require('./db');

(async () => {
  const exists = await db.schema.hasTable('users');
  if (!exists) {
    await db.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').unique().notNullable();
      table.date('birthdate').notNullable();
      table.string('gender').notNullable();
      table.string('document_id').unique().notNullable();
    });
    console.log('Tabla users creada con los nuevos campos.');
  } else {
    console.log('La tabla users ya existe.');
  }
})();
