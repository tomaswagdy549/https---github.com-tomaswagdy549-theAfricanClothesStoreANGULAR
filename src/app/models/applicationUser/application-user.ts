export class ApplicationUser {
    firstName!: string 
    lastName!: string 
    address!: string 
    cartId!: string 
    id!: string 
    userName!: string 
    normalizedUserName!: string
    email!: string 
    normalizedEmail!: string 
    emailConfirmed!: boolean 
    passwordHash!: string 
    securityStamp!: string 
    concurrencyStamp!: string 
    phoneNumber!: string 
    phoneNumberConfirmed!: string 
    twoFactorEnabled!: boolean 
    lockoutEnd!: string
    lockoutEnabled!: boolean 
    accessFailedCount!: number 
}
