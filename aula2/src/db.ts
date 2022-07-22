import { Pool } from "pg";

const connectionString = 'desenvolva proprio seu bd com prostgress (pg)';

const db = new Pool({connectionString})

export default db;