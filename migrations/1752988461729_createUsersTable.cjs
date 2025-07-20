exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('users',{
        id: {type: 'serial', primaryKey: true},
        username: {type: 'varchar(100)', notNull: true, unique: true},
        email: { type: 'varchar(100)', notNull: true, unique: true},
        password: {type:'varchar(100)', notNull: true},
        role: {type: 'varchar(50)', notNull: true, default: 'user'}
    })
};

exports.down = (pgm) => {
    pgm.dropTable('users')
};
