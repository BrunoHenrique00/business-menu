exports.up = knex => knex.schema.createTable('lojas', table => {
    
    table.increments('id')
    table.string('nome').unique().notNullable()
    table.integer('numero_telefone').notNullable()
    table.string('password').notNullable()
    table.string('email').unique().notNullable()
    table.boolean('subscription').defaultTo(false).notNullable()
    table.string('cor', [7]).defaultTo('#5700B8')
    
})

exports.down = exports.down = knex => knex.schema.dropTable('lojas')
