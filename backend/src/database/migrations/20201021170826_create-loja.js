exports.up = knex => knex.schema.createTable('lojas', table => {
    
    table.increments('id')
    table.text('nome').unique().notNullable()
    table.integer('numero_telefone').notNullable()
    
})

exports.down = exports.down = knex => knex.schema.dropTable('lojas')
