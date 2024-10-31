import { Type } from '@fastify/type-provider-typebox';
import { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLNonNull } from 'graphql';
import {
  MemberType,
  MemberTypeId,
  PostType,
  ProfileType,
  UserType,
  Context,
} from './types/types.js';
import { UUIDType } from './types/uuid.js';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

export const graphQLSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
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
        resolve: async (
          source,
          { id }: { id: string },
          { prisma, httpErrors }: Context,
        ) => {
          const memberType = await prisma.memberType.findUnique({
            where: {
              id,
            },
          });

          if (memberType === null) {
            throw httpErrors?.notFound();
          }

          return memberType;
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
        resolve: async (
          source,
          { id }: { id: string },
          { prisma, httpErrors }: Context,
        ) => {
          const post = await prisma.post.findUnique({
            where: {
              id,
            },
          });

          if (post === null) {
            throw httpErrors?.notFound();
          }

          return post;
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
        resolve: async (
          source,
          { id }: { id: string },
          { prisma, httpErrors }: Context,
        ) => {
          const user = await prisma.user.findUnique({
            where: {
              id,
            },
          });

          if (user === null) {
            throw httpErrors?.notFound();
          }

          return user;
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
        resolve: async (
          source,
          { id }: { id: string },
          { prisma, httpErrors }: Context,
        ) => {
          const profile = await prisma.profile.findUnique({
            where: {
              id,
            },
          });

          if (profile === null) {
            throw httpErrors?.notFound();
          }

          return profile;
        },
      },
    },
  }),
});
