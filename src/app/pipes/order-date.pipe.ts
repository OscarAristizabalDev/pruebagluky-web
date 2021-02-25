import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderDate'
})
export class OrderDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // Permite hacer la ordenacion de las publicaciones, del mas reciente al mas antiguo
    const sortedValues = value.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    // Se retorna la ordenacion
    return sortedValues;
  }

}
