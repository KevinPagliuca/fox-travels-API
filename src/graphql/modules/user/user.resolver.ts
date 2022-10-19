import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthorizationGuard } from '../../guards/authorization.guard';
import { CurrentUser } from '../../guards/current-user';
import { CreateUserInput, LoginUserInput } from '../../inputs/user.input';
import { User, UserWithToken } from '../../models/user';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async getAll() {
    return this.userService.getAllUsers();
  }

  @Query(() => User)
  async getById(id: string) {
    return this.userService.getUserById(id);
  }

  @Mutation(() => UserWithToken)
  async createUser(@Args('data') data: CreateUserInput) {
    return await this.userService.createUser(data);
  }

  @Mutation(() => UserWithToken)
  async loginUser(@Args('data') data: LoginUserInput) {
    return await this.userService.loginUser(data);
  }

  @Query(() => UserWithToken)
  @UseGuards(AuthorizationGuard)
  async me(@CurrentUser() user: UserWithToken) {
    return user;
  }
}
