import { Injectable, HttpService } from '@nestjs/common';
import { User } from './user.model'

let stringSanitizer = require("string-sanitizer");

@Injectable()
export class AppService {

  constructor(private httpService: HttpService){

  }

  getHello(): string {
    return 'Hello World!';
  }

  async getListOfUsers() : Promise<User[]> {
    const response = await this.httpService.get('https://jsonplaceholder.typicode.com/users').toPromise();

    let users = response.data;

      users.forEach(element => {

        const splittedPhoneNumber = element.phone.split(' ');
        element.phone = splittedPhoneNumber[0];
        element.phone = stringSanitizer.sanitize(element.phone); 
        element.phone = element.phone.charAt(0) == '1' ? '+' + element.phone : '+1' + element.phone;
      });

      return users;
  }
}
