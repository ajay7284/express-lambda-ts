// src/lambda.ts
import serverlessHttp from 'serverless-http';
import app from './app';  // No .js extension in CJS

// Fully typed—no errors!
export const handler = serverlessHttp(app);