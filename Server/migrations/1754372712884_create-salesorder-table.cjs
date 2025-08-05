exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('salesorder', {
        id: { type: 'serial', primaryKey: true },
        product_id: { type: 'integer', notNull: true, references: 'products(id)' },
        quantity: { type: 'integer', notNull: true },
        sales_date: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
    });
};

exports.down = (pgm) => {
    pgm.dropTable('salesorder');
};
