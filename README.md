## Running The Application:

### backend -

#### first install:

1. navigate to root of backend in terminal and run the following
2. Install PHP dependencies: `composer install`
3. Install Node.js dependencies: `npm i`
4. create .env file in project root from the .env.example file

#### setup database:
1. create a MySql database
2. add database connection details for the following in the newly created .env
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```
3. again in terminal in the backend project root run db migrations: `php artisan migrate`
4. seed the database (this will create 2 users): `php artisan db:seed`

#### getting running
You'll need to run the following services in separate terminal windows (all from the backend root directory):
1. start Reverb WebSocket server: `php artisan reverb:start`
2. start Vite development server: `npm run dev`
3. start the Laravel queue worker: `php artisan queue:listen`
4. start the Laravel development server: `php artisan serve`
5. open in browser: http://localhost:8000/


### frontend -

1. navigate to root of frontend in terminal
2. run `npm i`
3. run `ng serve`
4. open in browser: http://localhost:4200/
