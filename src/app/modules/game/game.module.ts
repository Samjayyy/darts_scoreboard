import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NumKeyboardModule } from '../numkeyboard/numkeyboard.module';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { IntroComponent } from './components/intro/intro.component';
import { MenuComponent } from './components/menu/menu.component';
import { OverviewComponent } from './components/overview/overview.component';
import { PlayerScoreComponent } from './components/playerscore/playerscore.component';
import { RootComponent } from './components/root/root.component';
import { StoreFeedbackComponent } from './components/storefeedback/storefeedback.component';
import { GameRoutingModule } from './game-routing.module';

@NgModule({
  declarations: [
    RootComponent,
    StoreFeedbackComponent,
    PlayerScoreComponent,
    CreateGameComponent,
    IntroComponent,
    OverviewComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    GameRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NumKeyboardModule,
  ],
  providers: [],
  bootstrap: [RootComponent],
  entryComponents: [],
})
export class GameModule {}
