import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiModelProperty } from '@nestjs/swagger';
import { Post as PostSchema } from './post.model';
import { IsNotEmpty } from 'class-validator'
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

class CreatePostDto {
  @ApiModelProperty({
    description: '文章标题',
    example: '示例文章标题',
  })
  @IsNotEmpty({message:'必须填写标题'})
  title: string;
  @ApiModelProperty({
    description: '文章正文',
    example: '示例文章内容',
  })
  content: string;
}

@Controller('posts')
@ApiUseTags('文章')
export class PostsController {

  constructor(@InjectModel(PostSchema) private readonly postModel:ModelType<PostSchema>){}
  @Get()
  @ApiOperation({
    title: '显示文章列表',
  })
  async index() {
    return await this.postModel.find();
  }
  @Post()
  @ApiOperation({
    title: '创建文章',
  })
  async create(@Body() createPostDto: CreatePostDto) {
    await this.postModel.create(createPostDto);
    return {
      success: true,
    };
  }
  @Get(':id')
  @ApiOperation({ title: '查看文章详情' })
  async detail(@Param('id') id: string) {
    return await this.postModel.findById(id);
  }

  @Put(':id')
  @ApiOperation({ title: '编辑文章' })
  async update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto) {
    await this.postModel.findByIdAndUpdate(id, updatePostDto);
    return {
      success: true,
    };
  }

  @Delete(':id')
  @ApiOperation({ title: '删除文章' })
  async remove(@Param('id') id: string) {
    await this.postModel.findByIdAndDelete(id);
    return {
      success: true,
    };
  }
}
