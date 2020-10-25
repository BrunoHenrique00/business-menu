exports.up = knex => knex.schema.createTable('produtos', table => {

        table.increments('id')
        table.text('nome').notNullable()
        table.text('descricao').notNullable()
        table.decimal('preco').notNullable()

        table.integer('loja_id').references('lojas.id')
    })

exports.down = knex => knex.schema.dropTable('produtos')