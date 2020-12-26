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
import CreateSoutenancesDto from './dtos/create-soutenances.dto';
import UpdateSoutenancesDto from './dtos/update-soutenances.dto';
import { SoutenancesModel } from './soutenances.model';
import { SoutenancesService } from './soutenances.service';
@ApiTags('soutenances')
@Controller('soutenances')
export class SoutenancesController {
  constructor(private readonly _service: SoutenancesService) {}
  @Get()
  @ApiResponse({ status: 200, description: 'Ok' })
  async findAll(): Promise<SoutenancesModel[]> {
    return await this._service.getAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'doc retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'doc does not exist' })
  async findById(@Param('id') id: string): Promise<SoutenancesModel> {
    return await this._service.get(id);
  }
  @Get('/session/:id')
  @ApiResponse({ status: 200, description: 'doc retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'doc does not exist' })
  async findBySessionId(@Param('id') id: string): Promise<any[]> {
    return await this._service.getAllBySession(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreateSoutenancesDto })
  async create(@Body() doc: CreateSoutenancesDto): Promise<SoutenancesModel> {
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
  @ApiBody({ type: UpdateSoutenancesDto })
  async update(
    @Param('id') id,
    @Body() doc: UpdateSoutenancesDto,
  ): Promise<SoutenancesModel> {
    return await this._service.update(id, doc);
  }
}
