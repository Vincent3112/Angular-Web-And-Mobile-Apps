import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostFormComponent } from './posts-list/post-form/post-form.component';
import { HeaderComponent } from './header/header.component';
import {AuthService} from './services/auth.service';
import {PostsService} from './services/posts.service';
import {AuthGuardService} from './services/auth-guard.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { SinglePostComponent } from './posts-list/single-post/single-post.component';

const appRoutes: Routes = [
    {path: 'auth/signup', component: SignupComponent},
    {path: 'auth/signin', component: SigninComponent},
    {path: 'posts', canActivate: [AuthGuardService], component: PostsListComponent},
    {path: 'posts/new', canActivate: [AuthGuardService], component: PostFormComponent},
  {path: 'posts/view/:id', canActivate: [AuthGuardService], component: SinglePostComponent},

  {path: 'prefix', redirectTo: 'posts'},
  {path: '**', redirectTo: 'posts'}

  ]

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    PostsListComponent,
    PostFormComponent,
    HeaderComponent,
    SinglePostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    PostsService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
