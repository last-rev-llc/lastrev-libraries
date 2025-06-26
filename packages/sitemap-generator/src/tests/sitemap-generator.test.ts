import '@testing-library/jest-dom';
import fs from 'fs';
import path from 'path';
import { generateSitemap } from '..';
import sitemapMock from './sitemap.mock';
import libxmljs from 'libxmljs2';

describe('sitemap-generator (legacy)', () => {
  test('generates valid index and sitemap files', async () => {
    await generateSitemap(sitemapMock(), './out');

    const sitemap = fs.readFileSync(path.resolve(__dirname, '../../out/sitemap.xml'), { encoding: 'utf8' });
    const page1 = fs.readFileSync(path.resolve(__dirname, '../../out/page1.xml'), { encoding: 'utf8' });
    const page2 = fs.readFileSync(path.resolve(__dirname, '../../out/page2.xml'), { encoding: 'utf8' });
    const page3 = fs.readFileSync(path.resolve(__dirname, '../../out/page3.xml'), { encoding: 'utf8' });

    expect(validateSchema('./schemas/siteindex.xsd', sitemap)).toBeTruthy();
    expect(validateSchema('./schemas/sitemap.xsd', page1)).toBeTruthy();
    expect(validateSchema('./schemas/sitemap.xsd', page2)).toBeTruthy();
    expect(validateSchema('./schemas/sitemap.xsd', page3)).toBeTruthy();

    expect(sitemap).toMatchInlineSnapshot(`
      "<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <sitemap>
          <loc>https://site.com/page1.xml</loc>
          <lastmod>2022-02-08</lastmod>
        </sitemap>
        <sitemap>
          <loc>https://site.com/page2.xml</loc>
          <lastmod>2022-02-08</lastmod>
        </sitemap>
        <sitemap>
          <loc>https://site.com/page3.xml</loc>
          <lastmod>2022-02-08</lastmod>
        </sitemap>
      </sitemapindex>"
    `);
    expect(page1).toMatchInlineSnapshot(`
      "<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>https://site.com/page1-a</loc>
          <lastmod>2022-02-01</lastmod>
        </url>
        <url>
          <loc>https://site.com/page1-b</loc>
          <lastmod>2022-02-03</lastmod>
        </url>
        <url>
          <loc>https://site.com/page1-c</loc>
          <lastmod>2022-02-08</lastmod>
        </url>
      </urlset>"
    `);
    expect(page2).toMatchInlineSnapshot(`
      "<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>https://site.com/page2-a</loc>
          <lastmod>2022-02-01</lastmod>
        </url>
        <url>
          <loc>https://site.com/page2-b</loc>
          <lastmod>2022-02-03</lastmod>
        </url>
        <url>
          <loc>https://site.com/page2-c</loc>
          <lastmod>2022-02-08</lastmod>
        </url>
      </urlset>"
    `);
    expect(page3).toMatchInlineSnapshot(`
      "<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>https://site.com/page3-a</loc>
          <lastmod>2022-02-01</lastmod>
        </url>
        <url>
          <loc>https://site.com/page3-b</loc>
          <lastmod>2022-02-03</lastmod>
        </url>
        <url>
          <loc>https://site.com/page3-c</loc>
          <lastmod>2022-02-08</lastmod>
        </url>
      </urlset>"
    `);
  });
});

function validateSchema(schemaPath: string, file: any) {
  const schemaFile = fs.readFileSync(path.resolve(__dirname, schemaPath), { encoding: 'utf8' });

  // Parse the sitemap and schema
  const xmlDoc = libxmljs.parseXml(file);
  const schemaDoc = libxmljs.parseXml(schemaFile);

  // Perform validation
  const isValid = xmlDoc.validate(schemaDoc);
  return isValid;
}
