// Associations Handling 

const db = {
  User: require('./user/user.model.js'),
  Admin: require('./admin/admin.model.js'),
  Book: require('./book/book.model.js'),
  LibraryTransaction: require('./LibraryTransaction/LibraryTransaction.model.js'),
};

// User associations
db.User.hasMany(db.LibraryTransaction, { foreignKey: 'user_id', as: 'borrows' });

// Book associations
db.Book.hasMany(db.LibraryTransaction, { foreignKey: 'book_id', as: 'borrows' });

// Borrow associations
db.LibraryTransaction.belongsTo(db.User, { foreignKey: 'user_id', as: 'user' });
db.LibraryTransaction.belongsTo(db.Book, { foreignKey: 'book_id', as: 'book' });

module.exports = db;