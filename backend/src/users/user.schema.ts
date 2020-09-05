import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User extends Document {
	@Prop({ required: true })
	username: string;

	@Prop({ required: true })
	password: string;

	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	age: number;

	@Prop() profilePicture?: string;
}

export const userSchema = SchemaFactory.createForClass(User);
