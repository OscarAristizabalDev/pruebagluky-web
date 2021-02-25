import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/entities/comment';
import { Commentario } from 'src/app/entities/commentario';
import { Post } from 'src/app/entities/post';
import { PostsService } from 'src/app/services/posts.service';
import { OrderDatePipe } from 'src/app/pipes/order-date.pipe';

declare var jQuery;

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.scss']
})
export class ViewPostsComponent implements OnInit {

  // objeto de tipo post
  post: Post;
  // nombre de usuario atenticado
  nameUsuario: string;
  // photo de usuario atenticado
  photoUrlUsuario: string;
  // array de comentarios
  comments: Array<Commentario>;
  // Variable de tipo comentario
  comment: Commentario;
  // variable para almacenar el nombre del usuario logeado
  userName: string;


  constructor(private postsService: PostsService, private currentRoute: ActivatedRoute) {
    // Se instacia el objeto post
    this.post = new Post();
    // Se instancia el array de posts
    this.comments = [];
    // Se instancia el objeto comentario
    this.comment = new Commentario;
    // Se obtiene del localstorage el nombre del usuario logeado
    this.userName = localStorage.getItem('name')
    // Permite recibir los parametros enviados por la url
    this.currentRoute.params.subscribe(params => {
      // Se valida que venga el id por la url
      if(typeof params.id !== 'undefined'){
        // Se carga la información del post
        this.load(params.id);
      }
    })
  }

  ngOnInit(): void {
  }

  /**
   * Permite consultar un post por ID
   * @param id 
   */
  private load(id: number){
    jQuery.fancybox.showLoading();
      // Se realiza la peticion al servicio para consultar el post por ID
      this.postsService.getById(id).subscribe((response: Post) =>{
        // Se guarda la respuesta en el objeto usuario
        this.post = response['data'];
        // Se consultan los comentarios del post
        this.loadComments(id);
        jQuery.fancybox.hideLoading();
      });
  }

  /**
   * Permite consultar los comentarios realizados en una publicacion
   * @param idPost 
   */
  private loadComments(idPost: number){
    // Se hace la petición al servicio para que consulte los comentarios por el ID de la publicación
    this.postsService.getCommentsPostById(idPost).subscribe((response: Array<Comment>) =>{
      // Se almacena los resultados en el array comments
      this.comments = response['data'];
      // Se indican la cantidad de comentarios que tiene la publicación
      this.post.cantidad_comentarios = response['meta']['pagination'].total;
    })
  }
  /**
   * Permite registrar un comentario en el post
   */
  saveComment(){
    jQuery.fancybox.showLoading();
    // Se asignan valores al comentario
    this.comment.post_id = this.post.id;
    this.comment.name = this.userName;
    // Por privacidad se registra cualquier correo
    // Pero es posible registrar el correo del usuario de gmail o facebook
    this.comment.email = 'correoprueba@gmail.com';
    // Se realiza la peticion al servicio para el registro del comentario
    this.postsService.addCommentPost(this.comment, this.post.id).subscribe(
      data => {
        // Se cargan todos los comentarios
        this.loadComments(this.post.id);
        jQuery.fancybox.hideLoading();
        // Se borra la información digitada en el comentario
        this.comment.body = "";
      }
    )
  }
}
