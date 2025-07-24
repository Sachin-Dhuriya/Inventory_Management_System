exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('suppliers',{
        id: {type: 'serial', primaryKey: true},
        name: {type: 'varchar(100)', notNull: true},
        phone: {type: 'varchar(100)', notNull: true, unique: true},
        email: {type: 'varchar(100)', unique: true},
        upi: {type: 'varchar(100)', unique: true}
    })
};


exports.down = (pgm) => {
    pgm.dropTable('suppliers')
};
