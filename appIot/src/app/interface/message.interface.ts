export interface dataChart {
    time: any,
    value: any
}

export interface ip {
    ip1: number,
    ip2: number,
    ip3: number,
    ip4: number,
    port: number,
    ip: string
}

export interface dataAccess {
    user: string,
    password: string
}

export interface validationAccess {
    access: boolean,
    error?: string
}

export interface saveConfig {
    ipAddress: string,
    name: string
    dataAccess: dataAccess,
}