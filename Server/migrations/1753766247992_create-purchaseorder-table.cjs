exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('purchaseorder', {
    id: { type: 'serial', primaryKey: true },
    product_id: { type: 'integer', references: 'products(id)', notNull: true },
    supplier_id: { type: 'integer', references: 'suppliers(id)', notNull: true },
    quantity: { type: 'integer', notNull: true },
    purchase_date: { type: 'timestamp', default: pgm.func('current_timestamp') }
  });
};

exports.down = (pgm) => {
  pgm.dropTable('purchaseorder');
};
