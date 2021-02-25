import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';

import { PostsComponent } from './pages/posts/posts.component';
import { OrderDatePipe } from './pipes/order-date.pipe';
import { GridFilterPipe } from './pipes/grid-filter.pipe';
import { ViewPostsComponent } from './pages/view-posts/view-posts.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostsPersonalComponent } from './pages/posts-personal/posts-personal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpInterceptorService } from './services/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    PostsComponent,
    OrderDatePipe,
    GridFilterPipe,
    ViewPostsComponent,
    PostsPersonalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '730745521822-iguicjtd5k96fam7s93nmnkgqbpgh4ls.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('745502480088252')
          }
        ]
      } as SocialAuthServiceConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
