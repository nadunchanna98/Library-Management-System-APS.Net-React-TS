# Library-Management-System-APS.Net-React-TS

This project contains a full-stack Library Management System built using the following technologies:

- **Backend**: .NET with Entity Framework and SQLite.
- **Frontend**: React with TypeScript.

## Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/nadunchanna98/Library-Management-System
```

## Set up the Backend

Navigate to the `backend` directory:

```bash
cd Backend/Library-Management-System
```

### Install Dependencies

Restore the necessary dependencies:

```bash
dotnet restore
```

### Configure Database

1. Set up SQLite as the database.
2. Update the connection string in `appsettings.json` to use SQLite:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=books.db"
  }
}
```

### Migrate the Database

If you haven't set up the database yet, create the database by running the following command:

```bash
dotnet ef database update
```

### Run the Application

Start the backend server:

```bash
dotnet run
```

### API Documentation

This backend uses Swagger for API documentation. Once the backend is running, you can access the Swagger UI by navigating to:

```bash
https://localhost:7251/swagger/
```

## Frontend Setup (React + TypeScript)

```bash
cd Frontend/library-app
```

### Install Dependencies

Install the necessary frontend dependencies:

```bash
npm install
```

### Run the Application

Start the frontend development server:

```bash
npm start
```

```bash
http://localhost:3000
```
