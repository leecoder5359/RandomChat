import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    return { 
      message: 'Hello hbs!', 
      data: {
        title: 'RandomChat',
        copyright: 'leecoder'
      }};
  }
}
