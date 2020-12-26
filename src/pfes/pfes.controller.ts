import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import CreatePfesDto from './dtos/create-pfes.dto';
import UpdatePfesDto from './dtos/update-pfes.dto';
import { PfesModel } from './pfes.model';
import { PfesService } from './pfes.service';
import {editFileName} from './utils/EditFileName';
@ApiTags('pfes')
@Controller('pfes')
export class PfesController {
  constructor(private readonly _service: PfesService) {}
  @Get()
  @ApiResponse({ status: 200, description: 'Ok' })
  async findAll(): Promise<PfesModel[]> {
    return await this._service.getAll();
  }
  @Get("/unassigned")
  @ApiResponse({ status: 200, description: 'Ok' })
  async findAllUnassigned(): Promise<PfesModel[]> {
    return await this._service.getAllUnassigned();
  }
  @Get(':id')
  @ApiResponse({ status: 200, description: 'doc retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'doc does not exist' })
  async findById(@Param('id') id: string): Promise<PfesModel> {
    return await this._service.get(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file',{
    storage: diskStorage({
      destination: './uploads/sujets-pfes/',
      filename: editFileName
    })
  }))
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreatePfesDto })
  async create(@UploadedFile() file, @Body() doc :CreatePfesDto): Promise<PfesModel> {
    doc.filepath = './uploads/'+file.path;
    return await this._service.create(doc);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'doc deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  async delete(@Param('id') id: string) {
    await this._service.delete(id);
  }

  @Put(':id')
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 200, description: 'doc deleted successfully.' })
  @ApiBody({ type: UpdatePfesDto })
  async update(
    @Param('id') id,
    @Body() doc: UpdatePfesDto,
  ): Promise<PfesModel> {
    return await this._service.update(id, doc);
  }
}
