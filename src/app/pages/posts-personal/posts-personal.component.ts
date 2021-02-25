import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/entities/post';
import { PostsService } from 'src/app/services/posts.service';
import { NgbModal, NgbModalConfig, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { OrderDatePipe } from 'src/app/pipes/order-date.pipe';

declare var jQuery;

@Component({
  selector: 'app-posts-personal',
  templateUrl: './posts-personal.component.html',
  styleUrls: ['./posts-personal.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class PostsPersonalComponent implements OnInit {
  
  // variable de tipo de array para publicaicones
  posts: Array<Post>;
  // variable de tipo post
  form: Post;
  // variable que permite hacer la busqueda de la publicación
  search: string;
  // modal para el registro de publicaciones personales
  modalRegistroPublicacion: NgbModalRef;
  // variable para el id del usuario en localstorage
  idUser: string;

  constructor(private postsService: PostsService, private currentRoute: ActivatedRoute, private modalService: NgbModal, config: NgbModalConfig) {
    // Se obtiene el ID registrado en el localstorage
    this.idUser = localStorage.getItem('userId');
    // Se parametrica la modal
    config.backdrop = 'static';
    config.keyboard = false;
    // Se instancia array de publicaciones
    this.posts = [];
    // Se instancia la clase publicacion
    this.form = new Post();
    // Permite recibir los parametros enviados por la url
    this.currentRoute.params.subscribe(params => {
      // Se valida que venga el id del usuario por la url
      if(typeof params.id !== 'undefined'){
        // Se consultan las publicaciones del usuario 
        this.load(params.id);
      }
    }) 
  }

  ngOnInit(): void {
  }

  /**
   * Permite consultar todos los posts personales 
   */
  private load(idUsuario: string){
    jQuery.fancybox.showLoading();
    // Se realiza la petición al servicio para consultar los posts de un usuario
    this.postsService.getPostByUser(idUsuario).subscribe((response: Post) =>{
      // Se almacena el resultado de publicaciones
      this.posts = response['data'];
      jQuery.fancybox.hideLoading();
    });
  }
  /**
   * Permite abrir la modal de registro de publicacion
   * @param content 
   */
  open(content) {
    // Se invoca el servicio que permite abrir la modal
    this.modalRegistroPublicacion = this.modalService.open(content, { size: 'lg' });
  }
  /**
   * Permite registrar un post personal
   */
  save(){
    // Se registra la publicacion personal, se envia la publicación y el ID del usuario
    this.postsService.add(this.form, this.idUser).subscribe(
      data => {
        // Se cierra la modal
        this.modalRegistroPublicacion.close();
        // Se cargan las publicaciones
        console.log('entro');
        this.load(this.idUser);
      }
    )
  }
}
