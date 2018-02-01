import { Component } from '@angular/core';
import {IndexMock} from './mock/index.mock';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor() {
    // 判断开发或者生产环境，使用mock拦截http请求
    if (!environment.production) {
      new IndexMock().mockjs();
    }
  }
}
