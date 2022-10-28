import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthorizationGuard } from '../../guards/authorization.guard';
import { CurrentUser } from '../../guards/current-user';
import { CreateUserInput, UserAuthInput as UserAuthInput } from '../../inputs/user.input';
import { User, UserWithToken } from '../../models/user';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Query(() => User)
  async getUserById(@Args('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Mutation(() => UserWithToken)
  async createUser(@Args('data') data: CreateUserInput) {
    return await this.userService.createUser(data);
  }

  @Mutation(() => UserWithToken)
  async userAuth(@Args('data') data: UserAuthInput) {
    return await this.userService.userAuth(data);
  }

  @Query(() => UserWithToken)
  @UseGuards(AuthorizationGuard)
  async me(@CurrentUser() user: UserWithToken) {
    return user;
  }
}
