import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from 'react-native-appwrite';

export const config = {
  platform: 'com.axebit.aora',
  projectId: '67a09530000b8d24c92b',
  storageId: '67a09aa5002572c7d879',
  databaseId: '67a0981f0022b4942168',
  endpoint: 'https://cloud.appwrite.io/v1',
  userCollectionId: '67a0984f00096d1cf73c',
  videoCollectionId: '67a09894001bab2a5d1a',
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const signIn = async (email: string, password: string) => {
  try {
    const sessions = await account.listSessions();
    if (sessions.total > 0) {
      await account.deleteSession('current');
    }

    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error(error);
    throw new Error((error as Error).message);
  }
};

interface CreateUserProps {
  email: string;
  password: string;
  username: string;
}

export const createUser = async ({
  email,
  password,
  username,
}: CreateUserProps) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) {
      throw new Error('Failed to create user');
    }

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        email,
        username,
        avatar: avatarUrl,
        accountId: newAccount.$id,
      }
    );

    return newUser;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create user');
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) {
      throw new Error('No user account found');
    }

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    if (!currentUser) {
      throw new Error('No user found');
    }

    return currentUser.documents[0];
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get current user');
  }
};
