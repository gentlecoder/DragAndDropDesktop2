/**
 * Creator: 10206072
 * Date: 2018/2/1
 * Time: 16:35
 *
 */
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user-desktop',
    pathMatch: 'full',
  },
  {
    path: 'user-desktop',
    loadChildren: './layout/layout.module#LayoutModule'
  },
  // {
  //   path: '**',
  //   component: TestComponent,
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
        useHash: false,
        enableTracing: true
      }),
    // <-- debugging purposes only
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
