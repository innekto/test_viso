import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const { DB_PORT, DB_PASSWORD, DB_HOST, DB_USERNAME, DB_DATABASE } = process.env;

export const dataSourceOptionst: DataSourceOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
};

export const dataSourse = new DataSource(dataSourceOptionst);
