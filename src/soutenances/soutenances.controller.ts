import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/guards/roles.guard';
import CreateSoutenancesDto from './dtos/create-soutenances.dto';
import UpdateSoutenancesDto from './dtos/update-soutenances.dto';
import { SoutenancesModel } from './soutenances.model';
import { SoutenancesService } from './soutenances.service';
@ApiTags('soutenances')
@Controller('soutenances')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class SoutenancesController {
  constructor(private readonly _service: SoutenancesService) { }
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
  @Get('/archived')
  @ApiResponse({ status: 200, description: 'Ok' })
  async findAllArchived(): Promise<SoutenancesModel[]> {
    return await this._service.getAllArchived();
  }

  @Get('/session/:id')
  @ApiResponse({ status: 200, description: 'doc retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'doc does not exist' })
  async findBySessionId(@Param('id') id: string): Promise<any[]> {
    return await this._service.getAllBySession(id);
  }
  @Get('/archive/:id/:sessionId')
  @ApiResponse({ status: 200, description: 'doc retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'doc does not exist' })
  async archive(@Param('id') id: string, @Param('sessionId') sessionId: string): Promise<any[]> {

    return await this._service.archive(id, sessionId);
  }
  @Get('/restore/:id/:sessionId')
  @ApiResponse({ status: 200, description: 'doc retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'doc does not exist' })
  async restore(@Param('id') id: string, @Param('sessionId') sessionId: string): Promise<any[]> {

    return await this._service.restore(id, sessionId);
  }
  @Post(":sessionId")
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreateSoutenancesDto })
  async create(@Body() doc : CreateSoutenancesDto,@Param('sessionId') sessionId : string): Promise<SoutenancesModel> {

    return await this._service.create(doc,sessionId);
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
