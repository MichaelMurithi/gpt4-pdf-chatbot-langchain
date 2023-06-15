export default class AuthSessionHelper {
    static getUserNameFromEmail(email: string) {
        return email.split('@')[0];
    }
}