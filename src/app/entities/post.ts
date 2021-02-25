export class Post {
    id: number;
    user_id: number;
    title: string;
    body: string;
    cantidad_comentarios: number;
    created_at: Date;
    updated_at: Date;

    constructor(){
        this.id = null;
        this.user_id = null;
        this.title = null;
        this.body =  null;
        this.cantidad_comentarios = null;
        this.created_at = null;
        this.updated_at = null;
    }
}
