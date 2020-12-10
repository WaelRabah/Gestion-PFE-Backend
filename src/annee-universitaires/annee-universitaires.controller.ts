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
import { AnneeUniversitairesModel } from './annee-universitaires.model';
import { AnneeUniversitairesService } from './annee-universitaires.service';
@ApiTags('annee-universitaires')
@Controller('annee-universitaires')
export class AnneeUniversitairesController {
  constructor(private readonly _service: AnneeUniversitairesService) {}
  @Get()
  @ApiResponse({ status: 200, description: 'Ok' })
  async findAll(): Promise<AnneeUniversitairesModel[]> {
    return await this._service.getAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'doc retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'doc does not exist' })
  async findById(@Param('id') id: string): Promise<AnneeUniversitairesModel> {
    return await this._service.get(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: AnneeUniversitairesModel })
  async create(
    @Body() doc: AnneeUniversitairesModel,
  ): Promise<AnneeUniversitairesModel> {
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
  @ApiBody({ type: AnneeUniversitairesModel })
  async update(
    @Param('id') id,
    @Body() doc: AnneeUniversitairesModel,
  ): Promise<AnneeUniversitairesModel> {
    return await this._service.update(id, doc);
  }
}
