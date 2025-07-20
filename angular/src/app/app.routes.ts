import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { MainComponent } from './layouts/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BlogComponent } from './components/blog/blog.component';
import { PostComponent } from './components/post/post.component';
import { TrackingComponent } from './components/tracking/tracking.component';
import { StockComponent } from './components/stock/stock.component';
import { OverviewComponent } from './components/stock/overview/overview.component';
import { HighDemandComponent } from './components/stock/high-demand/high-demand.component';
import { MapComponent } from './components/map/map.component';
import { MapviewComponent } from './components/map/mapview/mapview.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/login',
      },
      {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent,
      },
      {
        path: 'signup',
        pathMatch: 'full',
        component: SignupComponent,
      },
    ],
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        pathMatch: 'full',
        component: DashboardComponent,
      },
      {
        path: 'blogs',
        component: BlogComponent,
      },
      {
        path: 'blog/:blogId',
        component: PostComponent,
      },
      {
        path: 'tracking',
        component: TrackingComponent,
      },
      {
        path: 'stocks',
        component: StockComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: '/stocks/overview',
          },
          {
            path: 'overview',
            pathMatch: 'full',
            component: OverviewComponent,
          },
          {
            path: 'high-demand',
            pathMatch: 'full',
            component: HighDemandComponent,
          },
        ],
      },
      {
        path: 'map',
        pathMatch: 'full',
        component: MapviewComponent,
      },
    ],
  },
  // {
  //   path: '**',
  //   redirectTo: '/login',
  // },
];
