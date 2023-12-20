import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, usersProviders } from './entities/user.entity'


@Module({
  imports:[User],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...usersProviders,
  ],
})
export class UsersModule {}
