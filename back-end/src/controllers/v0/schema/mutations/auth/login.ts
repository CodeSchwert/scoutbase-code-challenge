import { GraphQLNonNull, GraphQLString } from 'graphql';
import * as bcrypt from 'bcrypt';
import UserType from '../../types/users/user';
import { User } from '../../../../../server';
import { generateJWT } from '../../../services/auth';

export default {
  type: UserType,
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  async resolve(parentValue: any, args: any, context: any) {
    try {    
      const { username, password } = args;

      /**
       * TODO - check username and password for reasonable values
       */

      // @ts-ignore
      const user = await User.findOne({
        where: { username }
      });

      if (user) {
        const hash = user.password;
        const passwordsMatch = await bcrypt.compare(password, hash);

        if (!passwordsMatch) {
          context.res.clearCookie('scoutbase-code-challenge');
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
