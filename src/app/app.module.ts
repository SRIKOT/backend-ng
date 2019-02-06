import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material';

import { TokenInterceptor } from './shared/token.interceptor';
import { AuthGuard } from './see-kpi/shared/auth.guard';
import { AppRoutingModule } from './app-routing.module';

import { InformationComponent } from './shared/information/information.component';
import { SnackBarComponent } from './shared/information/snack-bar/snack-bar.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    SnackBarComponent,
    InformationComponent
  ],
  entryComponents: [
    SnackBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [
    InformationComponent,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
