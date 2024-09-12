import { Raffle, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { invalidCredentialsError } from './errors';
import sessionRepository from '../../repositories/session-repository';
import userRepository from '../../repositories/user-repository';
import { exclude } from '../../utils/prisma-utils';

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);
  const token = await createSession(user.id);
  return {
    user: exclude(user, 'password'),
    token,
  };
}

async function userInfo(user_id: number) {
  const user = await userRepository.findById(user_id);
  if (!user) throw invalidCredentialsError();
  return {
    user: exclude(user, 'password'),
  };
}

async function twitchSignIn(code: string) {
  console.log(code);
  const response = await axios.post(`https://id.twitch.tv/oauth2/token`, {
    client_id: process.env.TWITCH_CLIENT_ID,
    client_secret: process.env.TWITCH_CLIENT_SECRET,
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.FRONTEND_URL,
  });
  const token = response.data.access_token;
  const userResponse = await axios.get('https://api.twitch.tv/helix/users', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Client-Id': process.env.TWITCH_CLIENT_ID,
    },
  });
  const user = await userRepository.findByEmail(userResponse.data.data[0].email);
  if (!user) {
    const twitchUser = await userRepository.createByTwitch({
      email: userResponse.data.data[0].email,
      name: userResponse.data.data[0].display_name,
      twitchId: userResponse.data.data[0].id,
      picture: userResponse.data.data[0].profile_image_url,
    });
    const sessionToken = await createSession(twitchUser.id);
    return { ...twitchUser, sessionToken };
  } else {
    await userRepository.updatedByTwitch(user.id, userResponse.data.data[0].id);
    const sessionToken = await createSession(user.id);

    return { sessionToken, id: user.id, email: user.email, name: user.name, picture: user.picture };
  }
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email, { id: true, email: true, password: true });
  if (!user) throw invalidCredentialsError();
  return user;
}

async function createSession(user_id: number) {
  const token = jwt.sign({ user_id }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    user_id,
  });

  return token;
}

export async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

export type SignInParams = Pick<User, 'email' | 'password'>;

export type TwitchParams = { code: 'string' };

type SignInResult = {
  user: Omit<User, 'id' | 'createdAt' | 'password' | 'updatedAt' | 'raffleId' | 'isAdmin'>;
  token: string;
};

type GetUserOrFailResult = Omit<User, 'createdAt' | 'updatedAt' | 'raffleId' | 'isAdmin'>;

const authenticationService = {
  signIn,
  userInfo,
  twitchSignIn,
};

export default authenticationService;
export * from './errors';
