import conf from '../conf/conf';
import { Account, Client, ID } from 'appwrite';

class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
           .setEndpoint(conf.appwriteUrl)
           .setProject(conf.appwriteProjectId);


        this.account = new Account(this.client);
    }



    async createAccount({id, email, password, name}){
        try {
           const userAccount =  await this.account.create(
                id,
                email,
                password,
                name
            )

        if(userAccount){
            return this.login({ email, password })
        }else{
            return userAccount;
        }
            
        } catch (error) {
            console.log(error);
            throw error;
            
        }
    }

    async getCurrentUser(){
        try { 
            return this.account.get();
        } catch (error) {
            console.log(error);
        }

        return null
    }

    async login({email, password}){
        try {

           return await this.account.createEmailPasswordSession(email, password);
            
        } catch (error) {
            console.log(error);
            throw error
            
        }
    }

    async logOut(){
        try {

            return await this.account.deleteSessions();
            
        } catch (error) {
            console.log(error);
            return false
            
        }
    }
}

const authService = new AuthService();

export default authService;