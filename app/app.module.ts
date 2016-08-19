import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { MyApp }   from './app';

@NgModule({
    declarations: [MyApp],
    imports:      [BrowserModule],
    bootstrap:    [MyApp],
})
export class AppModule {}