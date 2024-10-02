const { createObjectCsvStringifier } = require('csv-writer');
const { createResponse } = require('../utils/createResponse');

exports.generateCSVReport = (transactions) => {
    try {
        const formattedTransactions = formatTransactions(transactions);
        const csvContent = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(formattedTransactions);
        return csvContent;
    }
    catch (error) {
        return createResponse(false, "Error creating the CSV report!", 500, error.message);
    };
};

const formatTransactions = (transactions) => {
    const formattedTransactions = transactions.map(transaction => ({
        transactionId: transaction.id,
        userId: transaction.user.id,
        name: transaction.user.name,
        userName: transaction.user.userName,
        email: transaction.user.email,
        bookId: transaction.book.id,
        bookTitle: transaction.book.title,
        bookISBN: transaction.book.ISBN,
        bookAuthor: transaction.book.author,
        shelfLocation: transaction.book.shelfLocation,
        borrowed_at: new Date(transaction.borrowed_at).toISOString(),
        returned_at: transaction.returned_at ? new Date(transaction.returned_at).toISOString() : '',
        due_date: new Date(transaction.due_date).toISOString()
    }));
    return formattedTransactions;
};

const csvStringifier = createObjectCsvStringifier({
    header: [
        { id: 'transactionId', title: 'Transaction ID' },
        { id: 'userId', title: 'User ID' },
        { id: 'name', title: 'Name' },
        { id: 'userName', title: 'Username' },
        { id: 'email', title: 'Email' },
        { id: 'bookId', title: 'Book ID' },
        { id: 'bookTitle', title: 'Book Title' },
        { id: 'bookISBN', title: 'Book ISBN' },
        { id: 'bookAuthor', title: 'Book Author' },
        { id: 'shelfLocation', title: 'Shelf Location' },
        { id: 'borrowed_at', title: 'Borrowed At' },
        { id: 'returned_at', title: 'Returned At' },
        { id: 'due_date', title: 'Due Date' },
    ],
    recordDelimiter: '\n'
});