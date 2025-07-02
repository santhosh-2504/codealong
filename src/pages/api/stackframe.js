// pages/api/stackframe.js
export default function handler(req, res) {
    // Return an empty JavaScript file to prevent 404s and parsing errors
    res.setHeader('Content-Type', 'application/javascript');
    res.status(200).send('// Stackframe.js placeholder - prevents Pyodide errors');
  }