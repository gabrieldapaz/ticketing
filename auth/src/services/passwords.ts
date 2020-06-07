import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

// Going from a callback implementation
// to a promise base implementation
const scryptAsync = promisify(scrypt);
