import { NgModule } from '@angular/core';
import { LevelComponent } from './level/level.component';
import { OtherRoutingModule } from './other-routing.module';

@NgModule({
  imports: [
    OtherRoutingModule
  ],
  declarations: [
    LevelComponent
  ]
})
export class OtherModule {

}