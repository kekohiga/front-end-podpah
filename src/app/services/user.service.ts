import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../pages/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/guests';
  private users = new BehaviorSubject<User[]>([]);
  users$ = this.users.asObservable();

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  /** Carrega a lista de usuários do banco */
  private loadUsers() {
    this.http.get<User[]>(this.apiUrl).subscribe(users => this.users.next(users));
  }

  /** Adiciona um usuário e recarrega a lista */
  addUser(name: string, description: string, dayOfWeek: string) {
    this.http.post<User>(this.apiUrl, { name, description, dayOfWeek }).subscribe(() => {
      this.loadUsers(); // Recarrega os usuários após adicionar
    });
  }

  /** Atualiza um usuário e recarrega a lista */
  updateUser(id: string, name: string, description: string, dayOfWeek: string) {
    this.http.put<User>(`${this.apiUrl}/${id}`, { name, description, dayOfWeek }).subscribe(() => {
      this.loadUsers(); // Recarrega os usuários após atualizar
    });
  }

  /** Deleta um usuário e recarrega a lista */
  deleteUser(id: string) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.loadUsers(); // Recarrega os usuários após deletar
    });
  }
}
