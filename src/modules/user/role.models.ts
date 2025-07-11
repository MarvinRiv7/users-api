import { Document, model, Schema } from 'mongoose';

export interface IRole extends Document {
    rol: string;
}

const RoleSchema = new Schema<IRole>({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio'],
    },
});

export const Role = model<IRole>('Role', RoleSchema);