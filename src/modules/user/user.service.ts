import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entity/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async getUserData(userId: number) {
    const user = await this.getById(userId);

    return { ...this.removePasswordFromUser(user) };
  }

  removePasswordFromUser(user: User) {
    const { password: _, ...userData } = user;

    return userData;
  }

  getById(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  getByEmail(email: string) {
    return this.repository.findOne({ where: { email } });
  }

  saveUser(user: Partial<User>) {
    return this.repository.save(user);
  }
}
