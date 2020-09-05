import { Types } from 'mongoose';

export function _toObjectId(id: string) {
    return Types.ObjectId(id);
}