import { GraphQLNonNull, GraphQLString } from 'graphql';
import * as bcrypt from 'bcrypt';
import UserType from '../../types/users/user';
import { User } from '../../../../../server';
import { 
  generateJWT, 
  validateUsername, 
  validatePassword 
} from '../../../services/auth';

export default {
  type: UserType,
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  async resolve(parentValue: any, args: any, context: any) {
    try {
      // clear cookie on any result except valid login
      context.res.clearCookie('scoutbase-code-challenge');
      const { username, password } = args;

      if (!validateUsername(username)) {
        context.res.status(400);
        return {
          username: '',
          error: true,
          errorMsg: 'Incorrect username format.'
        };
      }
      if (!validatePassword(password)) {
        context.res.status(400);
        return {
          username: '',
          error: true,
          errorMsg: 'Password should be 6 to 254 characters long.'
        };
      }

      // @ts-ignore
      const user = await User.findOne({
        where: { username }
      });

      if (user) {
        const hash = user.password;
        const passwordsMatch = await bcrypt.compare(password, hash);

        if (!passwordsMatch) {
          context.res.status(401); // wrong password

          return { 
            username: '',
            error: true,
            errorMsg: 'Incorrect password.'
          };
        } else {
          const jwt = generateJWT(username);
          context.res.cookie('scoutbase-code-challenge', jwt, { httpOnly: true });
  
          return { 
            username,
            error: false,
            errorMsg: ''
          };
        }
      } else {
        context.res.status(401); // username not found
        return { 
          username: '',
          error: true,
          errorMsg: 'Username not found.'
        };
      }
    } catch (e) {
      console.error(e);
    }
  }
};
