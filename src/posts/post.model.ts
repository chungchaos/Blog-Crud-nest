import { getModelForClass, prop } from '@typegoose/typegoose'

export class Post {
    @prop()
    public title?:string
    @prop()
    public content?:string
}
// export const PostModel = getModelForClass(Post)