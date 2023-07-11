import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToastrModule } from 'ngx-toastr';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { HomeModule } from './home/home.module';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, NavMenuComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HomeModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
