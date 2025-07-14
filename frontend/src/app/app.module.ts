import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './features/login/login.component';
import { AdminDashboardComponent } from './features/admin/dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './features/user/dashboard/user-dashboard.component';
import { MovieCardComponent } from './shared/components/movie-card/movie-card.component';

import { AuthService } from './core/services/auth.service';
import { MovieService } from './core/services/movie.service';
import { OmdbService } from './core/services/omdb.service';
import { AuthGuard } from './core/guards/auth.guard';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    MovieCardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
  ],
  providers: [
    AuthService,
    MovieService,
    OmdbService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
