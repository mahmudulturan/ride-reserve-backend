import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    search(searchableFields: (keyof T & string)[]) {
        const searchKey = this.query.searchKey;
        if (typeof searchKey === 'string') {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map(
                    (field) =>
                    ({
                        [field]: { $regex: searchKey, $options: 'i' },
                    } as FilterQuery<T>),
                ),
            });
        }

        return this;
    }

    filter() {
        const queryObj = { ...this.query };

        const excludeFields = ['searchKey', 'sort', 'page', 'minPrice', 'maxPrice'];

        excludeFields.forEach((el) => delete queryObj[el]);

        // price range filtering
        const priceFilter: any = {};

        if (typeof this.query.minPrice === 'string' || typeof this.query.minPrice === 'number') {
            priceFilter.pricePerHour = { $gte: Number(this.query.minPrice) };
        }

        if (typeof this.query.maxPrice === 'string' || typeof this.query.maxPrice === 'number') {
            priceFilter.pricePerHour = { ...priceFilter.pricePerHour, $lte: Number(this.query.maxPrice) };
        }

        this.modelQuery = this.modelQuery.find({
            ...queryObj,
            ...priceFilter
        } as FilterQuery<T>);

        return this;
    }

    sort() {
        const sort =
            (typeof this.query.sort === 'string' ? this.query.sort.split(',').join(' ') : undefined) || '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort as string);

        return this;
    }

    paginate() {
        const page = Number(this.query.page) || 1;
        const limit = 8;
        const skip = (page - 1) * limit;

        this.modelQuery = this.modelQuery.skip(skip).limit(limit);

        return this;
    }
}

export default QueryBuilder;