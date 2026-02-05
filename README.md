npm init -y 
npm express mysql2 sequelize sequelize-cli
npx sequelize-cli init
npx sequelize-cli model:generate --name User --attributes name:String,email:String,Password:String
npx sequelize-cli model:generate --name Seller --attributes name:String,email:String,Password:String
npx sequelize-cli model:generate --name Admin --attributes email:String,Password:String
npx sequelize-cli db:migrate
npx sequelize-cli db:migrate --to 20260129121300-create-order.js
npx sequelize-cli seed:generate --name Admin
npx sequelize-cli db:seed:all
npx sequelize-cli db:seed --seed 20260129095213-Admin.js