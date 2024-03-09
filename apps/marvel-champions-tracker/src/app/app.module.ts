import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MarvelChampionsModule } from 'marvel-champions';
import { AppComponent } from './app.component';
import { AppRoutesModule } from './app.routes';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MarvelChampionsModule,
    RouterModule,
    AppRoutesModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
