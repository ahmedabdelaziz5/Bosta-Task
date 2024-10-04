##  Library Management System :
 - This was my Technical Assessment for Backend Engineer position **[@Bosta](https://www.linkedin.com/company/bostaapp/)** company
 - you can access the task from here: [Assessment](https://drive.google.com/file/d/1i1-G4E77-ITegHgsJwp9eH8TrT-J3Jmr/view?usp=sharing). `All bonus requirements have been fulfilled!`.
 - Postman collection: [Postman collection](https://drive.google.com/file/d/1KW0It53QBZxWlU4Q1unSBGJazyhoHJwZ/view?usp=sharing). <br><br>

## Objective: 
- The objective of the Library Management System is to provide an efficient, user-friendly solution for managing library operations, including book cataloging, member registration, borrowing, returning, and tracking overdue books. This system aims to streamline administrative tasks, enhance the library experience for users, and ensure accurate inventory management and reporting capabilities. <br><br>

## Tools:
![Static Badge](https://img.shields.io/badge/18.17.1-node-red)
![Static Badge](https://img.shields.io/badge/17.0-postgres--x86--64--windows-purple)
![Static Badge](https://img.shields.io/badge/5.1.1-bcrypt-blue)
![Static Badge](https://img.shields.io/badge/2.8.5-cors-0f3)
![Static Badge](https://img.shields.io/badge/2.8.5-csv--writer-darkgreen)
![Static Badge](https://img.shields.io/badge/16.4.5-dotenv-yellow)
![Static Badge](https://img.shields.io/badge/3.2.0-easy--rbac-09c)
![Static Badge](https://img.shields.io/badge/17.13-joi-green)
![Static Badge](https://img.shields.io/badge/9.0.2-jsonwebtoken-purple)
![Static Badge](https://img.shields.io/badge/2.30.1-moment-purple)
![Static Badge](https://img.shields.io/badge/6.9.15-nodemailer-orange)
![Static Badge](https://img.shields.io/badge/3.1.7-nodemon-09c)
![Static Badge](https://img.shields.io/badge/8.13.0-pg-blue)
![Static Badge](https://img.shields.io/badge/2.3.4-pg--hstore-red)
![Static Badge](https://img.shields.io/badge/5.0.3-rate--limiter--flexible-blue)
![Static Badge](https://img.shields.io/badge/6.37.3-sequelize-blue)
![Static Badge](https://img.shields.io/badge/4.3.10-chai-blue)
![Static Badge](https://img.shields.io/badge/4.4.0-chai--http-darkgreen)
![Static Badge](https://img.shields.io/badge/4.21.0-express-orange)
![Static Badge](https://img.shields.io/badge/10.4.0-mocha-purple)
![Static Badge](https://img.shields.io/badge/6.6.2-sequelize--cli-darkgreen)  <br><br>

## Main Features

### Authentication
- **Admin Authentication**: Secure access for administrators to manage the library system.
- **User Authentication**: Enable users to securely log in and access their accounts.
- **Robust Authentication**: Implement comprehensive authentication measures for enhanced security.
- **Robust Validation**: Ensure all inputs are thoroughly validated to maintain data integrity and prevent errors.

### User Management
- **User Management**: Administrators can create, read, update, and delete user accounts (CRUD operations).

### Books Management
- **Books Management**: Administrators can perform CRUD operations on books, including adding new titles, updating details, and removing books from the system.

### Library Management
- **Library Management for Users**:
  - **Borrow Books**: Users can borrow available books.
  - **Return Books**: Users can return previously borrowed books.
  - **View All Books**: Users can see a list of all available books in the library.
  - **View My Borrowed Books**: Users can check the books they currently have borrowed.

### Transaction Management
- **Transaction Management for Admins**:
  - **View All Transactions**: Administrators can access a complete list of all library transactions.
  - **Filter Overdue Transactions**: Option to filter transactions to display only overdue items.
  - **Generate Overdue CSV**: Produce a CSV file containing all overdue operations from the last month.
  - **Generate Borrow Operations CSV**: Generate a CSV file with all borrowing operations that occurred within a specified time frame.

### Deployment and Testing
- **Docker Support**: Build a Docker image to facilitate easy installation and deployment of the project.
- **Unit Testing**: Includes sample unit tests using Mocha and Chai to ensure code reliability and functionality.

<br><br>
## ERD Model
![Database design](https://github.com/ahmedabdelaziz5/Bosta-Task/blob/master/ERD.png)

<br><br>
## Admin module:

### Admin schema: 

```JavaScript
{
 id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [1, 30],
      notEmpty: true
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'admin',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
}

```

### Admin endPoints: 

|Endpoint|Method|Usage
|-------:|-----:|-----
|/api/admin/login|POST|Authenticate an admin user and provide access to their account.
|/api/admin/forgetPassword|POST|Allow an admin to request a new password.
|/api/admin/updateProfile|PATCH|Allow an admin to modify their profile information.
|/api/admin/changePassword|PATCH|Allow an admin to change their password.

<br><br>
## User module:

### user schema: 

```JavaScript
{
id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 30],
      notEmpty: true
    }
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [3, 30],
      notEmpty: true
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  deletedAt: {
    allowNull: true,
    type: DataTypes.DATE
  }
}

```

### User endPoints: 

|Endpoint|Method|Usage
|-------:|-----:|-----
|/api/user/|GET|Retrieve a list of all registered users.
|/api/user/login|POST|Authenticate a user and provide access to their account.
|/api/user/add|POST|Create a new user account.
|/api/user/update|PATCH|Modify an existing user's information.
|/api/user/delete|DELETE|Remove a user account from the system.

<br><br>
## Book module:

### Book schema: 

```JavaScript
{
   id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 30]
    }
  },
  ISBN: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [10, 13]
    }
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 30]
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 0
    }
  },
  availableQuantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      isInt: true,
      min: 0
    }
  },
  shelfLocation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  deletedAt: {
    allowNull: true,
    type: DataTypes.DATE
  }
}

```

### Book endPoints:

|Endpoint|Method|Usage
|-------:|-----:|-----
|/api/book/|GET|Retrieve a list of all books.
|/api/book/add|POST|Create a new book entry.
|/api/book/update|PATCH|Modify an existing book's information.
|/api/book/delete|DELETE|Remove a book from the system.

<br><br>
## LibraryTransaction module:

### LibraryTransaction schema: 

```JavaScript
{
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
    book_id: {
        type: DataTypes.INTEGER
    },
    borrowed_at: {
        type: DataTypes.DATE
    },
    returned_at: {
        type: DataTypes.DATE,
        defaultValue: null
    },
    due_date: {
        type: DataTypes.DATE
    },
    deleted_at: {
        type: DataTypes.DATE
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
}

```

### LibraryTransaction endPoints: 

|Endpoint|Method|Usage
|-------:|-----:|-----
|/api/library/currentBooks|GET|Retrieve a list of all currently borrowed books.
|/api/library/transactions|GET|Retrieve a list of all borrowing or overdue transactions.
|/api/library/borrowTransactionsReport|GET|Generate a CSV report of all borrowing transactions within a specified period.
|/api/library/overdueTransactionsReport|GET|Generate a CSV report of all overdue books for the past month.
|/api/library/borrow|POST|Initiate a borrowing operation.
|/api/library/return|POST|Initiate a book return operation. 

<br><br>
## Notes: 
- You can run the project using two options:
  - Run the project using the *Docker* image with the following command: `docker-compose up`
  - Run the project using the following command: `npm start`

- Database Migration and Seeding
  - This project uses Sequelize for database management, including migrations and seeding.
  -  Below are the commands used to create and manage migrations and seeds:
      - To create a new migration, use the following command:
        ```bash 
          npx sequelize-cli migration:generate --name <migration_name>
        ```
      - To apply all pending migrations to the database, run:
        ```bash 
          npx sequelize-cli db:migrate 
        ```
      - To create seed migration to seed your admin, run:
        ```bash 
          npx sequelize-cli seed:generate --name seed_name
        ```
      - To run all the seed files, use the following command:
        ```bash 
          npx sequelize-cli db:seed:all
        ```

- all get requests has a pagination you can send page (default = 1) and limit (default = 10) in the URL (query params).
