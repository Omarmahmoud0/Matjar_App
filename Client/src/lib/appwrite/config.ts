import { Client, Account, Databases, Storage, Avatars} from 'appwrite';


export const appwriteConfig = {
    url: import.meta.env.VITE_APPWRITE_PROJECT_URL,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    usersCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
    productsCollectionId: import.meta.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID,
    cartCollectionId: import.meta.env.VITE_APPWRITE_CART_COLLECTION_ID,
    orderCollectionId: import.meta.env.VITE_APPWRITE_ORDER_COLLECTION_ID,
    savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
    addressCollectionId: import.meta.env.VITE_APPWRITE_ADDRESS_COLLECTION_ID
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.url)
    .setProject(appwriteConfig.projectId); // Replace with your project ID

export const account = new Account(client);
export const database = new Databases(client)
export const storage = new Storage(client)
export const avatars = new Avatars(client)