import { user } from './user.model';

export interface AuthenticationResponse {
    token?: string;
    user: user;
}
