import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) {}

  /**
   * Permite consultar un usuario por ID
   * @param id 
   */
  public getById(id: string){
    return this.http.get(environment.apiUrl+'/users/'+id);
  }

  /**
   * Permite registrar un nuevo usuario
   * @param formData 
   */
  public add(formData: User){
    return this.http.post(environment.apiUrl+'/users', formData);
  }
}
