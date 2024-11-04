import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import {
  PostType,
  ProfileType,
  UserType,
  Context,
  CreatePostInput,
  CreateUserInput,
  CreateProfileInput,
  ChangePostInput,
  ChangeProfileInput,
  ChangeUserInput,
} from './types/types.js';
import { UUIDType } from './types/uuid.js';
import { Post, User, Profile } from '@prisma/client';

export const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPost: {
      type: PostType,
      args: {
        dto: { type: CreatePostInput },
      },
      resolve: async (
        source,
        { dto }: { dto: Omit<Post, 'id'> },
        { prisma }: Context,
      ) => {
        return await prisma.post.create({
          data: dto,
        });
      },
    },
    deletePost: {
      type: GraphQLString,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (source, { id }: { id: string }, { prisma }: Context) => {
        await prisma.post.delete({
          where: {
            id,
          },
        });

        return '';
      },
    },
    changePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: ChangePostInput },
      },
      resolve: async (
        source,
        { id, dto }: { id: string; dto: Omit<Post, 'id'> },
        { prisma }: Context,
      ) => {
        return await prisma.post.update({
          where: {
            id,
          },
          data: dto,
        });
      },
    },

    createUser: {
      type: UserType,
      args: {
        dto: { type: CreateUserInput },
      },
      resolve: async (
        source,
        { dto }: { dto: Omit<User, 'id'> },
        { prisma }: Context,
      ) => {
        return await prisma.user.create({
          data: dto,
        });
      },
    },
    deleteUser: {
      type: GraphQLString,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (source, { id }: { id: string }, { prisma }: Context) => {
        await prisma.user.delete({
          where: {
            id,
          },
        });

        return '';
      },
    },
    changeUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: ChangeUserInput },
      },
      resolve: async (
        source,
        { id, dto }: { id: string; dto: Omit<User, 'id'> },
        { prisma }: Context,
      ) => {
        return await prisma.user.update({
          where: {
            id,
          },
          data: dto,
        });
      },
    },

    createProfile: {
      type: ProfileType,
      args: {
        dto: { type: CreateProfileInput },
      },
      resolve: async (
        source,
        { dto }: { dto: Omit<Profile, 'id'> },
        { prisma }: Context,
      ) => {
        return await prisma.profile.create({
          data: dto,
        });
      },
    },
    deleteProfile: {
      type: GraphQLString,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (source, { id }: { id: string }, { prisma }: Context) => {
        await prisma.profile.delete({
          where: {
            id,
          },
        });

        return '';
      },
    },
    changeProfile: {
      type: ProfileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: ChangeProfileInput },
      },
      resolve: async (
        source,
        { id, dto }: { id: string; dto: Omit<Profile, 'id'> },
        { prisma }: Context,
      ) => {
        return await prisma.profile.update({
          where: {
            id,
          },
          data: dto,
        });
      },
    },

    subscribeTo: {
      type: GraphQLString,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (
        source,
        { userId, authorId }: { userId: string; authorId: string },
        { prisma }: Context,
      ) => {
        await prisma.subscribersOnAuthors.create({
          data: {
            subscriberId: userId,
            authorId,
          },
        });

        return '';
      },
    },
    unsubscribeFrom: {
      type: GraphQLString,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (
        source,
        { userId, authorId }: { userId: string; authorId: string },
        { prisma }: Context,
      ) => {
        await prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: userId,
              authorId,
            },
          },
        });

        return '';
      },
    },
  },
});
