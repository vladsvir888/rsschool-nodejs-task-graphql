import { GraphQLObjectType, GraphQLList, GraphQLNonNull } from 'graphql';
import {
  MemberType,
  MemberTypeId,
  PostType,
  ProfileType,
  UserType,
  Context,
} from './types/types.js';
import { UUIDType } from './types/uuid.js';

export const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async (source, args, { prisma }: Context) => {
        return prisma.memberType.findMany();
      },
    },
    memberType: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(MemberTypeId) },
      },
      resolve: async (source, { id }: { id: string }, { prisma }: Context) => {
        return await prisma.memberType.findUnique({
          where: {
            id,
          },
        });
      },
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async (source, args, { prisma }: Context) => {
        return prisma.post.findMany();
      },
    },
    post: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (source, { id }: { id: string }, { prisma }: Context) => {
        return await prisma.post.findUnique({
          where: {
            id,
          },
        });
      },
    },

    users: {
      type: new GraphQLList(UserType),
      resolve: async (source, args, { prisma }: Context) => {
        return prisma.user.findMany();
      },
    },
    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (source, { id }: { id: string }, { prisma }: Context) => {
        return await prisma.user.findUnique({
          where: {
            id,
          },
        });
      },
    },

    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (source, args, { prisma }: Context) => {
        return prisma.profile.findMany();
      },
    },
    profile: {
      type: ProfileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (source, { id }: { id: string }, { prisma }: Context) => {
        return await prisma.profile.findUnique({
          where: {
            id,
          },
        });
      },
    },
  },
});
