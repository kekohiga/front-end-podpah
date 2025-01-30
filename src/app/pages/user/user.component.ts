import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule], // Adicionando FormsModule aqui
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  users$ = this.userService.users$;
  name = '';
  description = '';

  constructor(private userService: UserService) {}

  addUser() {
    if (this.name && this.description) {
      this.userService.addUser(this.name, this.description);
      this.name = '';
      this.description = '';
    }
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id);
  }
}
