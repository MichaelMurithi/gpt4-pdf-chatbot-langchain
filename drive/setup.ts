import fs from 'fs';
import path from 'path';

export function loadEnvVariablesAndCreateAuthFile(): void {
    // Define environment variables
    const {
        CLIENT_ID,
        PROJECT_ID,
        AUTH_URI,
        TOKEN_URI,
        AUTH_PROVIDER_CERT_URL,
        CLIENT_SECRET,
        REDIRECT_URIS,
        JAVASCRIPT_ORIGINS
    } = process.env;

    // Create an object with the environment variables
    const envVariables = {
        web: {
            client_id: CLIENT_ID,
            project_id: PROJECT_ID,
            auth_uri: AUTH_URI,
            token_uri: TOKEN_URI,
            auth_provider_x509_cert_url: AUTH_PROVIDER_CERT_URL,
            client_secret: CLIENT_SECRET,
            redirect_uris: REDIRECT_URIS ? JSON.parse(REDIRECT_URIS) : [],
            javascript_origins: JAVASCRIPT_ORIGINS ? JSON.parse(JAVASCRIPT_ORIGINS) : []
        }
    };

    // Convert the object to JSON
    const jsonData = JSON.stringify(envVariables, null, 2);

    // Get the current directory
    const currentDirectory = process.cwd();

    // Define the file path for the JSON file
    const filePath = path.join(currentDirectory, '/drive/oauth2.keys.json');

    // Write the JSON data to the file
    fs.writeFileSync(filePath, jsonData);

    console.log('Google drive auth keys file created at: ', filePath);
}
