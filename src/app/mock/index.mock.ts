import * as Mock from 'mockjs';
import {DashboardMock} from './dashboard.mock';

export class IndexMock {
  constructor() {
  }

  mockjs() {
    Mock.setup({
      timeout: '10-300'
    });
    new DashboardMock().mock();
  }
}
