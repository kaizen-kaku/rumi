// Make sure to add SALT to your .env file
const SALT = process.env.SALT || 'defaultSaltIfEnvNotSet';

export default function saltAndHashPassword(password: string): string {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + SALT);
  
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data[i];
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Convert to hexadecimal string
  const hashHex = (hash >>> 0).toString(16);
  
  return hashHex.padStart(8, '0'); // Ensure at least 8 characters
}

// Usage
// const hashedPassword = saltAndHashPassword('myPassword123');