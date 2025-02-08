import { promises as fs } from 'fs';
import { resolve } from 'path';

export default defineEventHandler(async (event) => {
  const filePath = resolve('assets/static/map.html');
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    event.node.res.setHeader('Content-Type', 'text/html');
    return fileContent;
  } catch (error) {
    event.node.res.statusCode = 404;
    return 'NoFile';
  }
});
