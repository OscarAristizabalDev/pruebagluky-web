import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gridFilter'
})
export class GridFilterPipe implements PipeTransform {

  transform(items: Array<any>, search: string = null): Array<any> {
    
    // Se valida que haya items y texto de busqueda
    if(!Array.isArray(items) || search === null){
      return items;
    }
    // se crea una validación que contenga algo la busqueda aparte para que no choque con la validación anterior en caso de que sea null
    if(search.trim() ===  ""){
      return items;
    }

    // Se realiza el filtro y se devuelve el resultado
    return items.filter(item => {
      // Se obtiene la llave de cada item
      const itemsKeys = Object.keys(item);

      // Se ejecuta el metodo reduce, para encontrar en todos los campos alguna coindidencia con la busqueda
      // Se envia false en el segundo argumento para indicar desde un inicio que no se ha encontrado nada 
      return itemsKeys.reduce((previosValue, keyName) => {
        return previosValue || new RegExp(search, 'gi').test(item[keyName]);
      }, false);

    });
    
  }

}
