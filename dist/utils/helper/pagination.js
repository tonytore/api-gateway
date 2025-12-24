"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = paginate;
async function paginate(delegate, opts) {
    const { page, pageSize, where, orderBy } = opts;
    const skip = (page - 1) * pageSize;
    const [totalCount, raw] = await Promise.all([
        delegate.count({ where }),
        delegate.findMany({ where, skip, take: pageSize, orderBy }),
    ]);
    return {
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
        currentPage: page,
        pageSize,
        items: raw,
    };
}
