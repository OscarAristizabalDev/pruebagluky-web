export class Comment {
    id: number;
    post_id: number;
    name: string;
    email: string;
    body: string;
    created_at: Date;
    updated_at: Date;

    constructor(){
        this.id = null;
        this.post_id = null;
        this.name = null;
        this.email = null;
        this.body = null;
        this.created_at = null;
        this.updated_at = null;
    }
}
