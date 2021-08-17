import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CreateGameComponent } from './pages/create-game/create-game.component';
import { GameComponent } from './pages/game/game.component';

const route : Routes = [
    { path: 'CreateGame', component: CreateGameComponent},
    {path: 'Game',component:GameComponent},
    {path:'', redirectTo:'/CreateGame',pathMatch:'full'}

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(route)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
