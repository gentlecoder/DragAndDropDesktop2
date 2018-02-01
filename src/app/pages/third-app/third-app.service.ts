/**
 * Creator: 10206072
 * Date: 2018/1/24
 * Time: 11:23
 *
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {third_app_port} from '../../port/third-app.port';

@Injectable()
export class ThirdAppService {

  constructor(private http: HttpClient) {
  }

  getThirdAppList(): Observable<object> {
    return this.http.get(third_app_port.thirdAppList);
  }

  getDashboardNavPanel(): Observable<object> {
    return this.http.get(third_app_port.dashboardNavPanel);
  }

  saveDashboardNavPanel(body): Observable<object> {
    return this.http.post(third_app_port.saveDashboardNavPanel, body);
  }
}
