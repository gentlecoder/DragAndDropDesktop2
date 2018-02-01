import {Component, OnInit, ViewChild} from '@angular/core';
import {GridsterComponent} from '../../components/gridster/gridster.component';
import {IGridsterOptions} from '../../components/gridster/IGridsterOptions';
import {IGridsterDraggableOptions} from '../../components/gridster/IGridsterDraggableOptions';
import {gridsterOptions} from '../dashboard/dashboard-drag-option/gridster.options';
import {gridsterDraggableOptions} from '../dashboard/dashboard-drag-option/gridster-draggable.options';
import {itemOptions} from '../dashboard/dashboard-drag-option/item.options';
import {ActivatedRoute, Router} from '@angular/router';
import {ThirdAppService} from './third-app.service';
import {NzMessageService} from 'ng-zorro-antd';
import {HttpParams} from '@angular/common/http';

declare const $: any;

@Component({
  selector: 'app-third-app',
  templateUrl: './third-app.component.html',
  styleUrls: ['./third-app.component.less'],
  providers: [ThirdAppService]
})
export class ThirdAppComponent implements OnInit {
  // 工作台
  dashboardNavPanelData;

  // 背景图片
  bgUrl: string;
  bgImgs = [{
    bgUrl: './assets/images/third-app/bg01.jpg',
    selected: true
  }, {
    bgUrl: './assets/images/third-app/bg02.jpg',
    selected: false
  }, {
    bgUrl: './assets/images/third-app/bg03.jpg',
    selected: false
  }];

  // slider实例
  slidey: any;
  slideyData: any;
  slideyTotal: number;

  // 拖拽组件参数
  @ViewChild(GridsterComponent) gridster: GridsterComponent;
  cardDragAndDrop = false;
  cardResizable = false;
  cardWidth = 1;
  cardHeight = 1;
  itemOptions = itemOptions;
  gridsterOptions: IGridsterOptions = gridsterOptions;
  gridsterDraggableOptions: IGridsterDraggableOptions = gridsterDraggableOptions;
  widgetsDataBak = [];
  widgetsData = [];
  widgetsArray;

  // 添加第三方应用
  addAppVisible = false;
  thirdAppData: object[] = [];


  constructor(private  route: ActivatedRoute, private router: Router,
              private thirdAppService: ThirdAppService, private _message: NzMessageService) {
  }

  ngOnInit() {
    this.gridsterOptions.responsiveOptions[2].lanes = 5;
    this.gridsterDraggableOptions.handlerClass = 'panel-heading-draggable';
    this.initDesktop();
    this.initThirdAppList();

  }

  /**
   * 初始化桌面
   */
  initDesktop() {
    this.thirdAppService.getDashboardNavPanel().subscribe(data => {
      if (data['success']) {
        if (data['data']) {
          this.dashboardNavPanelData = data['data'];
          this.bgUrl = this.dashboardNavPanelData.bgUrl;
          this.bgImgs.forEach(v => v.selected = v.bgUrl === data['data']['bgUrl']);
          this.widgetsData = JSON.parse(this.dashboardNavPanelData.widgetData);
        } else {
          // 未登录过的用户、初始化用户桌面
          this.bgUrl = './assets/images/third-app/bg01.jpg';
        }
        this.widgetsData.push({addApp: true});
        this.generateWidgetsData();
        this.unsliderInit();
      } else {
        this._message.error('获取用户桌面数据失败');
      }
    });
  }

  /**
   * 初始化第三方app列表
   */
  initThirdAppList() {
    // 用户在后台过滤
    // const params = new HttpParams().set('username', window.localStorage.getItem('username') ?
    //   window.localStorage.getItem('username').replace(/"/g, '') : 'admin');
    this.thirdAppService.getThirdAppList().subscribe(data => {
      if (data['success']) {
        this.thirdAppData = data['data'];
      } else {
        this._message.error('获取第三方应用列表数据失败');
      }
    });
  }

  /**
   * 重新整合卡片数据
   */
  generateWidgetsData() {
    this.widgetsArray = [];
    // todo
    for (let i = 0; i < this.widgetsData.length / 10; i++) {
      this.widgetsArray.push(this.widgetsData.filter((v, index) => (index >= i * 10) && (index < 10 + i * 10)));
    }
  }

  /**
   * 左右滑动初始化
   */
  unsliderInit() {
    $(function () {
      this.slidey = $('.banner').unslider({
        arrows: {
          prev: '<a class="unslider-arrow prev"><img class="arrow" id="al" src="assets/images/dashboard/arrowl.png" alt="prev" width="20" height="35"></a>',
          next: '<a class="unslider-arrow next"><img class="arrow" id="ar" src="assets/images/dashboard/arrowr.png" alt="next" width="20" height="37"></a>'
        },
      });
      this.slideyData = this.slidey.data('unslider');
      this.slideyTotal = this.slideyData.total;
      $('.app-add').parent().css('background', 'transparent');
    });
  }

  /**
   * 重新初始化滑动
   * @param {boolean} jumpOrNot
   */
  reinitUnslider(jumpOrNot: boolean) {
    $(function () {
      this.slideyData.calculateSlides();
      if (this.slideyTotal !== this.slideyData.total) {
        $('nav.unslider-nav').remove();
        this.slideyData.initNav();
        this.slideyTotal = this.slideyData.total;
      }
      if (jumpOrNot) {
        while (this.slideyData.current !== (this.slideyData.total - 1)) {
          this.slideyData.next();
        }
      }
      $('.app-add').parent().css('background', 'transparent');
    });
  }

  /**
   * 卡片option改变操作
   * @param {IGridsterOptions} options
   */
  optionsChange(options: IGridsterOptions) {
    this.gridsterOptions = options;
    // console.log('options change:', options);
  }

  /**
   * 卡片流重新加载
   * @param event
   */
  onReflow(event) {
    // console.log('onReflow', event);
  }

  /**
   * 卡片内容改变
   * @param $event
   * @param gridster
   */
  itemChange($event: any, gridster) {
    // console.log('item change', $event);
  }

  /**
   * 删除卡片
   * @param $event
   * @param {number} index1
   * @param {number} index2
   * @param {GridsterComponent} gridster
   */
  deleteCard($event, index1: number, index2: number, gridster: GridsterComponent) {
    $event.preventDefault();
    // this.widgetsArray[index1].splice(index2, 1);
    this.widgetsData.splice(index1 * 10 + index2, 1);
    // 删除位置信息，重新排版
    for (let i = 0; i < this.widgetsData.length; i++) {
      delete this.widgetsData[i].xLg;
      delete this.widgetsData[i].xMd;
      delete this.widgetsData[i].xSm;
      delete this.widgetsData[i].xXl;
      delete this.widgetsData[i].yLg;
      delete this.widgetsData[i].yMd;
      delete this.widgetsData[i].ySm;
      delete this.widgetsData[i].yXl;
    }
    this.generateWidgetsData();
    this.reinitUnslider(false);
    // console.log('widget remove', index1, index2);
  }

  /**
   * 页面跳转
   * @param {Object} widget
   */
  jumpToSource(widget: object) {
    if (!this.cardDragAndDrop) {
      if (widget['url'] !== '') {
        this.router.navigate([widget['router'], widget['url']], {relativeTo: this.route});
      } else {
        this.router.navigate([widget['router']], {relativeTo: this.route});
      }
      // const routerUrl = [];
      // routerUrl.push('layout/left/' + widget['router']);
      // routerUrl.push(widget['url']);
      // this.router.navigate(routerUrl);
      const tmpItem = {};
      tmpItem['appName'] = widget['title'];
    }
  }

  /**
   * 跳转第三方应用页面
   * @param url
   */
  gotoThirdApp(widget) {
    if (!this.cardDragAndDrop && !widget.addApp) {
      window.open(widget.url);
    }
  }

  /**
   * 选择主题
   * @param bg
   * @param i
   */
  themeSelect(bg, i) {
    this.bgImgs.forEach((v, index) => {
      v.selected = index === i;
    });
    this.bgUrl = bg.bgUrl;
    this.dashboardNavPanelData.bgUrl = bg.bgUrl;
    this.thirdAppService.saveDashboardNavPanel(this.dashboardNavPanelData).subscribe(data => {
      if (data['success']) {
        this._message.create('success', `主题修改成功！`);
      } else {
        // todo 修改失败后是否回退主题
        this._message.create('error', `主题修改失败！`);
      }
    });
  }

  /**
   * 拖拽删除卡片
   */
  enableCardDragAndDrop() {
    this.widgetsDataBak = this.widgetsData.concat();
    this.widgetsData.pop();
    this.generateWidgetsData();
    this.reinitUnslider(true);
    this.cardDragAndDrop = true;
  }

  /**
   * 显示添加应用弹出框
   */
  showAddAppModal() {
    this.addAppVisible = true;
  }

  closeAddAppModal() {
    this.addAppVisible = false;
  }

  /**
   * 添加第三方应用到面板上
   * @param app
   */
  addThirdApp(app) {
    const tmp = {};
    tmp['url'] = app.appUrl;
    tmp['id'] = app.appId;
    tmp['imgUrl'] = app.appLogo;
    tmp['title'] = app.appName;
    this.widgetsData.pop();
    this.widgetsData.push(tmp);
    this.saveDashboardPanel('add');
  }

  /**
   * 取消添加
   * @param app
   */
  cancelAddThirdApp(app) {
    this.widgetsData = this.widgetsData.filter(e => e.id !== app.appId);
    this.widgetsData.pop();
    this.saveDashboardPanel('cancel');
  }

  /**
   * 保存用户工作台
   */
  saveDashboardPanel(action) {
    this.dashboardNavPanelData.widgetData = this.widgetsData;
    this.thirdAppService.saveDashboardNavPanel(this.dashboardNavPanelData).subscribe(data => {
      if (data['success']) {
        this._message.create('success', `保存成功！`);
        this.widgetsData.push({addApp: true});
        this.generateWidgetsData();
        this.reinitUnslider(true);
        this.initThirdAppList();
      } else {
        action === 'add' && this.widgetsData.pop();
        this.widgetsData.push({addApp: true});
        this.generateWidgetsData();
        this.reinitUnslider(true);
        this._message.create('error', `保存失败！`);
      }
    });
  }

  /**
   * 保存卡片
   * @param {boolean} saveFlag
   */
  saveCardEdit(saveFlag: boolean) {
    this.cardDragAndDrop = false;
    if (saveFlag) {
      this.saveDashboardPanel('edit');
    } else {
      this.widgetsData = this.widgetsDataBak.concat();
      this.generateWidgetsData();
      this.reinitUnslider(true);
    }
  }

  /**
   * 重置卡片
   */
  // resetCardEdit() {
  //   this.resetWidget = !this.resetWidget;
  // }

}
