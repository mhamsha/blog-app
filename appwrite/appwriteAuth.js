import conf from "../conf/conf.js";
import { Account, Client, ID } from "appwrite";
// * Authenthecation Service
class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client.setEndpoint(conf.appwriteEndpoint).setProject(conf.appwriteProjectID);
    this.account = new Account(this.client);
  }
  // * Get a user's account details
  async getCurrentUser() {
    try {
      return await this.account.get();
      
      
    } catch (error) {
      console.log("Error: appwrite :: auth :: getCurrentUser : " + error);
    }
    return null;
  }
  // * Create a new account
  async createAccount({email, password, name}) {
    try {
      const user = await this.account.create(ID.unique(), email, password, name);
      console.log(user)

      if (user) {
        return await this.createSession({email, password});
        
      }
    } catch (error) {
      console.log("Error: appwrite > auth > createAccount :");
      throw error;
    }
  }
  // * Create a new session or login
  async createSession({email, password}) {
    try {
      return await this.account.createEmailPasswordSession(email, password);

    } catch (error) {
      console.log("Error: appwrite > auth > createSession : ");
      throw error;
    }
  }
  // * Delete a session or logout
  async deleteSession() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Error: appwrite > auth > deleteSession : ");
      throw error;
    }
  }
}
const appwriteAuthService = new AuthService();
export default appwriteAuthService;
