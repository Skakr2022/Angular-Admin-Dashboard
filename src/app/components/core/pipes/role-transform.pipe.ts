import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleTransform'
})
export class RoleTransformPipe implements PipeTransform {
  transform(value: string): string {
    const roleName = value.split('_')[1].toLowerCase();
    const capitalizedRole = roleName.charAt(0).toUpperCase() + roleName.slice(1);
    return capitalizedRole;
  }
}