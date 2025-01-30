import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../app/pages/user/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users = new BehaviorSubject<User[]>([]);
  users$ = this.users.asObservable();

  private daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  private nextId = 1;

  addUser(name: string, description: string) {
    const dayOfWeek = this.daysOfWeek[(this.nextId - 1) % 7];
    const newUser: User = { id: this.nextId++, name, description, dayOfWeek };
    this.users.next([...this.users.getValue(), newUser]);
  }

  deleteUser(id: number) {
    this.users.next(this.users.getValue().filter(user => user.id !== id));
  }
}
