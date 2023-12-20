import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.create<User>({...createUserDto});
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll<User>();
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findByPk<User>(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<number> {
    const [affectedCount] = await this.usersRepository.update<User>(updateUserDto, { where: { id } });
    return affectedCount;
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    if (user) {
      await user.destroy();
    }
  }
}
