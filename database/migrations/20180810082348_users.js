exports.up = function (knex) {
    return knex.schema
    .createTable('users', users => {
        users.increments();

        users
            .string('username', 255)
            .notNullable()
            .unique();
        users.string('password', 255).notNullable();
        users.string('email', 255).notNullable().unique();
    })
    .createTable('projects', tbl => {
        tbl.increments();
        tbl.text('name')
            .notNullable();
        tbl.text('funding_goal');
        tbl.text('description');
        tbl.text('location');
        tbl.text('image');
        tbl.text('public');
        tbl.integer('amount');
        tbl.text('email');
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('projects');
};
