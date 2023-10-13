/* eslint-disable prettier/prettier */
/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable prettier/prettier */
// pages/api/generate-og-image.tsx

import { VercelRequest, VercelResponse } from '@vercel/node';
import puppeteer from 'puppeteer';

export default async (req: VercelRequest, res: VercelResponse) => {
  const { title } = req.query as { title: string };

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(`
    <html>
      <head>
        <meta property="og:title" content="${title}">
      </head>
      <body>
        <h1>${title}</h1>
      </body>
    </html>
  `);

  const imageBuffer = await page.screenshot({ type: 'png' });

  await browser.close();

  res.setHeader('Content-Type', 'image/png');
  res.status(200).end(imageBuffer);
};
