import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { Schedule } from './interfaces/schedule.interface';
const puppeteer = require('puppeteer');

@Injectable()
export class GrabberService {
  async getSchedule(): Promise<Schedule[]> {
    const endpoint = 'https://www.dcm.co.uk';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(`${endpoint}/films/date/2020/03"`, {
      waitUntil: 'networkidle0',
    });
    let htmlPage = await page.evaluate(() => document.body.innerHTML);

    let $ = cheerio.load(htmlPage);
    const data = $('body .calendar__period.js-calendar-period .calendar__items').map(
      (index, elem) => {
        const title = $(elem)
          .find('h1.calendar__heading')
          .text();
        const date = $(elem)
          .find('p.calendar__meta.meta')
          .contents()
          .first()
          .text();
        return { title, date }
      },
    ).toArray();
    console.log('data', data);

    const rar = await page.$$(
      'body .calendar__period.js-calendar-period .calendar__items',
    );
    for (let i = 0; i < rar.length; ++i) {
      await rar[i].click();
      htmlPage = await page.evaluate(() => document.body.innerHTML);
      $ = cheerio.load(htmlPage);
      data[i]["description"] = $('body .calendarOverlay__item__section > p').text();
    }

    browser.close();
    return data as [];
  }
}
