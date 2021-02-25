import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PostsPersonalComponent } from './pages/posts-personal/posts-personal.component';
import { PostsComponent } from './pages/posts/posts.component';
import { ViewPostsComponent } from './pages/view-posts/view-posts.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'posts', component: PostsComponent},
  {path: 'posts/:id/view', component: ViewPostsComponent},
  {path: 'posts/:id/personal', component: PostsPersonalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
