import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getRoleName',
  pure: true
})
export class GetRoleNamePipe implements PipeTransform {

  transform(role: any, ...args: any[]): any {
    return role.substring(role.lastIndexOf('_')+1);
  }

  //role.substring(0,role.lastIndexOf('_'));
}
