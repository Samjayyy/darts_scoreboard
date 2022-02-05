import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { IntroComponent } from './components/intro/intro.component';
import { MenuComponent } from './components/menu/menu.component';
import { OverviewComponent } from './components/overview/overview.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/create',
    pathMatch: 'full'
  },
  {
    path: 'create',
    component: CreateGameComponent
  },
  {
    path: 'intro',
    component: IntroComponent
  },
  {
    path: 'overview',
    component: OverviewComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
