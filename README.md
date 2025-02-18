# Shopify Warehouse API

This project is a Node.js application that integrates with Shopify to manage warehouse orders.

## Prerequisites

- Node.js (version >= 18)
- npm (version >= 9)
- MYSQL database

## Installation

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    cd shopify-warehouse-api-ts
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

    Or

    ```bash
    yarn
    ```

3.  Set up environment variables:

    - Create a `.env` file in the project root directory.
    - Copy the contents of `.env.example` into the `.env` file.
    - Update the values in the `.env` file with your actual Shopify API credentials and database connection string.

      ```
      SHOPIFY_API_KEY=your_shopify_api_key
      SHOPIFY_API_SECRET=your_shopify_api_secret
      SHOPIFY_API_ACCESS=your_shopify_api_access_token
      SHOPIFY_APP_URL=your_shopify_app_url
      WAREHOUSE_API_URL=your_warehouse_api_url
      WAREHOUSE_API_KEY=your_warehouse_api_key
      PORT=3000
      DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
      ```

4.  Set up the database:

    - Ensure that you have a PostgreSQL database running.
    - Update the `DATABASE_URL` in the `.env` file with your database connection string.
    - Run the Prisma migrations to create the database schema:

      ```bash
      npx prisma migrate dev
      ```

5.  Start the application:

    ```bash
    npm run dev
    ```

    Or

    ```bash
    yarn dev
    ```

## Endpoints

- `GET /orders`: Retrieves all orders from Shopify.
- `POST /webhooks/order/create`: Webhook endpoint to receive new order notifications from Shopify.

## Notes

- Make sure to replace the placeholder values in the `.env` file with your actual credentials.
- The application uses Prisma as the ORM. Refer to the Prisma documentation for more information on how to configure and use Prisma.
- The application uses Nodemon for automatic restarts during development.
