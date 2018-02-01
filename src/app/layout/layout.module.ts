/**
 * Creator: 10206072
 * Date: 2018/2/1
 * Time: 16:51
 *
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GridsterModule} from '../components/gridster/gridster.module';
import {LayoutComponent} from './layout.component';
import {LayoutRoutingModule} from './layout-routing.module';
import {ThirdAppComponent} from '../pages/third-app/third-app.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutRoutingModule,
    NgZorroAntdModule.forRoot(),
    GridsterModule
  ],
  declarations: [
    LayoutComponent,
    ThirdAppComponent
  ],
  exports: []
})
export class LayoutModule {
}
