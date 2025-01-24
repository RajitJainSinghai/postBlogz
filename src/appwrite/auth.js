import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    // this contructor got created because when the user creates the account then only the cleint id is created 
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectid);
            this.account = new Account(this.client); 
    }
    // this method is for the user to create the account
    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.client.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                //call another method, becuase when the user is signing up so that the user got loggedin they dont need to go and login again.
                return this.login({email, password})
            } else {
                return userAccount
            }
        } catch (error) {
            throw error;
        }

    }
    // this method is for the user to login
    async login({email, password}) {
        try {
            await this.account.createEmailPasswordSession(email, password);
        }
        catch (error) {
            throw error;
        }
    }
    // this method is because when we want to check the user is loggedin or not
    async getCurrentUser() {
        try {
           return await this.account.get();
        }
        catch (error) {
            console.log("appwrite service error", error);   
        }
        return null;
    }
    // this method is for the user to logout.
    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}
const authService = new AuthService()

export default authService