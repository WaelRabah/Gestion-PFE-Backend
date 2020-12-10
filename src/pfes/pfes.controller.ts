import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PfesModel } from './pfes.model';
import { PfesService } from './pfes.service';
@ApiTags('pfes')
@Controller('pfes')
export class PfesController {
  constructor(private readonly _service: PfesService) {}
  @Get()
  @ApiResponse({ status: 200, description: 'Ok' })
  async findAll(): Promise<PfesModel[]> {
    return await this._service.getAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'doc retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'doc does not exist' })
  async findById(@Param('id') id: string): Promise<PfesModel> {
    return await this._service.get(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: PfesModel })
  async create(@Body() doc: PfesModel): Promise<PfesModel> {
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
  @ApiBody({ type: PfesModel })
  async update(@Param('id') id, @Body() doc: PfesModel): Promise<PfesModel> {
    return await this._service.update(id, doc);
  }
}
