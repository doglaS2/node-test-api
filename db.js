import 'dotenv/config';
import postgres from 'postgres';
import http from "http";
import { neon } from "@neondatabase/serverless";

const URL = process.env.DATABASE_URL;

export const sql = postgres(URL, { ssl: 'require' });
