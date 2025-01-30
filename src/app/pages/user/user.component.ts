import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../user/user.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  users$ = this.userService.users$;
  name = '';
  description = '';
  dayOfWeek = '';
  isEditing = false;
  editingUserId: number | null = null;

  daysOfWeek = [
    'Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira',
    'Quinta-Feira', 'Sexta-Feira', 'Sábado'
  ];

  constructor(private userService: UserService) {}

  addUser() {
    if (this.name && this.description && this.dayOfWeek) {
      this.userService.addUser(this.name, this.description, this.dayOfWeek);
      this.resetForm();
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
    if (this.isEditing && this.editingUserId !== null) {
      this.userService.updateUser(this.editingUserId, this.name, this.description, this.dayOfWeek);
    } else {
      this.addUser();
    }
    this.resetForm();
  }

  deleteUser(id: number) {
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
