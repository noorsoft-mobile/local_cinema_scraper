import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from "cheerio";
import { Schedule } from './interfaces/schedule.interface';

@Injectable()
export class GrabberService {
  async getSchedule(): Promise<Schedule[]> {
    const endpoint = axios.create({
      baseURL: 'https://kinospartak.ru/',
    });
    const { data } = await endpoint.get('billboard/schedule/');
    const $ = cheerio.load(data);
    const schedule = $('#content h2')
      .map((index, element) => {
        const date = $(element).text();
        const items = $(element)
          .next()
          .find('li.schedule_row');

        const xxx = items
          .map((index1, element1) => {
            const title = $(element1)
              .find('ul > li')
              .eq(0)
              .find('h3 a')
              .text();
            return { title };
          })
          .toArray();
        //console.log(xxx);
        return { date, items: xxx };
      })
      .toArray();
    return schedule as any[];
  }
}
