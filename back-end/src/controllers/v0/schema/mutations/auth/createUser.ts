import { GraphQLNonNull, GraphQLString } from 'graphql';
import UserType from '../../types/users/user';
import { User } from '../../../../../server';
import { 
  generateJWT,
  generatePassword,
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
      const tryUser = await User.findOne({
        where: { username }
      });

      if (!tryUser) {
        const hashedPassword = await generatePassword(password);

        // @ts-ignore
        await User.create({
          username,
          password: hashedPassword
        });

        const jwt = generateJWT(username);
        context.res.cookie('scoutbase-code-challenge', jwt, { httpOnly: true });

        return { 
          username,
          error: false,
          errorMsg: ''
        };
      } else {
        context.res.status(418); // or use a more appropriate error code!!
        return { 
          username: '',
          error: true,
          errorMsg: 'Username already in use.'
        };
      }
    } catch (e) {
      console.error(e);
    }
  }
};
