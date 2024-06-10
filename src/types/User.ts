export type RegisterForm = {
  id: string;
  username: string;
  email: string;
  password: string;
};

export type LoginForm = {
<<<<<<< HEAD
  id: string;
=======

>>>>>>> 5a559b7d1b635bef387d490a3d0c4e9f579af2dc
  email: string;
  password: string;
};
export type UserLoginResponse = {
  accessToken: string;
  users: {
    id: string;
    email: string;
  }
};
<<<<<<< HEAD

=======
export type User = {
  email: string;
  role: string;
  username: string;
};
>>>>>>> 5a559b7d1b635bef387d490a3d0c4e9f579af2dc
export type UserLoginRes = {
  token: string;
  user: {
    _id: string;
    email: string;
    role: string;
    username: string;
  };
};
