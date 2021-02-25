import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Commentario } from '../entities/commentario';
import { Post } from '../entities/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  /**
   * Permite consultar todos los posts registrados
   */
  public getAll(){
    return this.http.get(environment.apiUrl+'/posts');
  }

  /**
   * Permite consultar un post por ID
   * @param id 
   */
  public getById(id: number){
    return this.http.get(environment.apiUrl+'/posts/'+id);
  }

  /**
   * Permite consultar los comentarios de un post
   * @param postId 
   */
  public getCommentsPostById(postId: number){
    return this.http.get(environment.apiUrl+'/posts/'+postId+'/comments');
  }

  /**
   * 
   * @param userId 
   */
  public getPostByUser(userId: string){
    return this.http.get(environment.apiUrl+'/users/'+userId+'/posts');
  } 

  /**
   * Permite registrar un post de un nuevo usuario
   * @param formData 
   * @param userId 
   */
  public add(formData: Post, userId: string){
    return this.http.post(environment.apiUrl+'/users/'+userId+'/posts', formData);
  }

  /**
   * Permite registrar un comentario en un Post
   * @param formData 
   * @param postId 
   */
  public addCommentPost(formData: Commentario, postId: number){
    return this.http.post(environment.apiUrl+'/posts/'+postId+'/comments', formData);
  }
}
