import {
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { PrismaClient } from '@prisma/client';

export type Context = {
  prisma: PrismaClient;
};

export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    BASIC: { value: 'BASIC' },
    BUSINESS: { value: 'BUSINESS' },
  },
});
export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
    id: { type: MemberTypeId },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  },
});

export const PostType = new GraphQLObjectType({
  name: 'PostType',
  fields: {
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  },
});

export const ProfileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: {
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberType: {
      type: MemberType,
      resolve: async (
        { memberTypeId }: { memberTypeId: string },
        args,
        { prisma }: Context,
      ) => {
        return await prisma.memberType.findUnique({
          where: {
            id: memberTypeId,
          },
        });
      },
    },
  },
});

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: ProfileType,
      resolve: async ({ id }: { id: string }, args, { prisma }: Context) => {
        return await prisma.profile.findUnique({
          where: {
            userId: id,
          },
        });
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async ({ id }: { id: string }, args, { prisma }: Context) => {
        return prisma.post.findMany({
          where: {
            authorId: id,
          },
        });
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }: { id: string }, args, { prisma }: Context) => {
        return await prisma.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: id,
              },
            },
          },
        });
      },
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }: { id: string }, args, { prisma }: Context) => {
        return await prisma.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: id,
              },
            },
          },
        });
      },
    },
  }),
});
