import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../user/user.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [UserService], // Garante que o serviço está disponível
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  private userService = inject(UserService);
  users$ = this.userService.users$; // Usamos users$ no template com o async pipe
  name = '';
  description = '';
  dayOfWeek = '';
  isEditing = false;
  editingUserId: string | null = null;

  daysOfWeek = [
    'Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira',
    'Quinta-Feira', 'Sexta-Feira', 'Sábado'
  ];

  constructor() {}

  addUser() {
    if (this.name && this.description && this.dayOfWeek) {
      this.userService.addUser(this.name, this.description, this.dayOfWeek);
      setTimeout(() => {
        window.location.reload(); // Recarrega a página após adicionar
      }, 500);
    }
  }

  editUser(user: User) {
    this.name = user.name;
    this.description = user.description;
    this.dayOfWeek = user.dayOfWeek;
    this.isEditing = true;
    this.editingUserId = user.id;
  }

  saveUser() {
    if (this.isEditing && this.editingUserId) {
      this.userService.updateUser(this.editingUserId, this.name, this.description, this.dayOfWeek);
    } else {
      this.addUser();
    }
    this.resetForm();
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id);
  }

  resetForm() {
    this.name = '';
    this.description = '';
    this.dayOfWeek = '';
    this.isEditing = false;
    this.editingUserId = null;
  }
}
