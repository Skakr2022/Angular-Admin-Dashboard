import { _isNumberValue } from "@angular/cdk/coercion";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class SortingDataAccessorService {
  
    sortingDataAccessor: ((data: any, sortHeaderId: any) => string | number) =
    (data: any, sortHeaderId: any): string | number => {
    //This represents the data that you want to sort. It's an object or an array
      let value = null;
      if (sortHeaderId.indexOf('.') !== -1) {
        const ids = sortHeaderId.split('.');
        value = data[ids[0]][ids[1]];
      } else {
        value = data[sortHeaderId];
      }
      return _isNumberValue(value) ? Number(value) : value;
    }
}
