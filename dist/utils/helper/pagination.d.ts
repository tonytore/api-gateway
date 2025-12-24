import { Prisma, PrismaClient } from "@prisma/client";
export interface PageResult<T> {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    items: T[];
}
export declare function paginate<M extends keyof PrismaClient, R>(delegate: PrismaClient[M] & {
    count(args: {
        where?: Prisma.Enumerable<Prisma.JsonObject>;
    }): Promise<number>;
    findMany(args: {
        where?: Prisma.JsonObject;
        skip: number;
        take: number;
        orderBy?: Prisma.JsonObject;
    }): Promise<R[]>;
}, opts: {
    page: number;
    pageSize: number;
    where?: Prisma.JsonObject;
    orderBy?: Prisma.JsonObject;
}): Promise<PageResult<R>>;
