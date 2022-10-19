export class CreateUserDTO {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export class LoginUserDTO {
  email: string;
  password: string;
}
