import * as Mock from 'mockjs';
import {third_app_port} from '../port/index.port';
import ConstantsList from '../app.config';

export class DashboardMock {

  constructor() {
  }

  mock() {
    Mock.mock(third_app_port.thirdAppList, {
      'data': ConstantsList.thirdAppListData,
      'returnCode': 0,
      'success': true
    });

    Mock.mock(third_app_port.dashboardNavPanel, {
      'data': ConstantsList.dashboardNavPanelData,
      'returnCode': 0,
      'success': true
    });

    Mock.mock(third_app_port.saveDashboardNavPanel, {
      data: {},
      'returnCode': 0,
      'success': true
    });
  }
}
