import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/entities/post';
import { PostsService } from 'src/app/services/posts.service';
import { OrderDatePipe } from 'src/app/pipes/order-date.pipe';

declare var jQuery;

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  // variable para almacenar los objetos de tipo publicacion
  posts: Array<Post>;
  // variable de tipo publicación
  form: Post;
  // variable que permite hacer la busqueda de publicaciones
  search: string;

  constructor(private postsService: PostsService) {
    // Se realiza la instancia de las variables
    this.posts = [];
    this.form = new Post();
    this.search = null;
  }

  ngOnInit(): void {
    // Se cargan las publicaciones
    this.load();
  }
  /**
   * Permite consultar todos los posts registrados
   */
  private load(){
    jQuery.fancybox.showLoading();
    // Se hace la petición al servicio para consultar todas las publicaciones
    this.postsService.getAll().subscribe((response: Array<Post>)=>{
      // Se almacena el resultado en el array de publicaciones
      this.posts = response['data'];
      jQuery.fancybox.hideLoading();
    });
  }

}
