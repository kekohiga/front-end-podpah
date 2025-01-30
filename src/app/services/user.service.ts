import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../app/pages/user/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users = new BehaviorSubject<User[]>([]);
  users$ = this.users.asObservable();

  private daysOfWeek = [
    'Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira',
    'Quinta-Feira', 'Sexta-Feira', 'Sábado'
  ];
  private nextId = 1;

  addUser(name: string, description: string, dayOfWeek: string) {
    const usersPerDay = this.users.getValue().filter(user => user.dayOfWeek === dayOfWeek);

    if (usersPerDay.length >= 7) {
      alert(`O limite de 7 convidados para ${dayOfWeek} foi atingido!`);
      return;
    }

    const newUser: User = { id: this.nextId++, name, description, dayOfWeek };
    this.users.next([...this.users.getValue(), newUser]);
  }

  updateUser(id: number, name: string, description: string, dayOfWeek: string) {
    const updatedUsers = this.users.getValue().map(user =>
      user.id === id ? { ...user, name, description, dayOfWeek } : user
    );
    this.users.next(updatedUsers);
  }

  deleteUser(id: number) {
    this.users.next(this.users.getValue().filter(user => user.id !== id));
  }
}
