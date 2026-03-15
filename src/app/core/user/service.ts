import { inject, Injectable, signal } from "@angular/core";
import { User } from "./model";
import { UsersDao } from "./dao";
import { JobService } from "../job/service";

@Injectable({
    providedIn: 'root'
}) export class UsersService {
    dao   = inject(UsersDao);
    job_service = inject(JobService);
    users = signal<User[]>([]);

    getuserfromjob(username: string) {
      const user = this.users().find(u => u.username == username);

      if(user) {
        //  return user;
      }
      else {
          this.dao.getUserById(username)

      }
    }


}
