import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString("hex")}.${salt}`;
  }

  // static async compare(storedPassword: string, suppliedPassword: string) {
  //   const [hashedPassword, salt] = storedPassword.split('.');
  //   const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

  //   return buf.toString('hex') === hashedPassword;
  // }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const parts = storedPassword.split(".");
    if (parts.length !== 2) {
      throw new Error("Invalid stored password format");
    }
    const [hashedPassword, salt] = parts as [string, string];
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    return buf.toString("hex") === hashedPassword;
  }
}
