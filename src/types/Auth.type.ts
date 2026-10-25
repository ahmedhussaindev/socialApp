export type RegisterFormData = LoginFormData &{
  name: string,
  username: string,
  rePassword: string,
  dateOfBirth: string,
  gender: string
}

export type LoginFormData = {
  password: string,
  email: string,
}
