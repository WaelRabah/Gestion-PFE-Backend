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
import { AnneeUniversitairesModel } from './annee-universitaires.model';
import { AnneeUniversitairesService } from './annee-universitaires.service';
import CreateAnneeUniversitairesDto from './dtos/create-annee-universitaires.dto';
import UpdateAnneeUniversitairesDto from './dtos/update-annee-universitaires.dto';
@ApiTags('annee-universitaires')
@Controller('annee-universitaires')
@UseGuards(AuthGuard('jwt'), RolesGuard)
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
  @ApiBody({ type: CreateAnneeUniversitairesDto })
  async create(
    @Body() doc: CreateAnneeUniversitairesDto,
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
  @ApiBody({ type: UpdateAnneeUniversitairesDto })
  async update(
    @Param('id') id,
    @Body() doc: UpdateAnneeUniversitairesDto,
  ): Promise<AnneeUniversitairesModel> {
    return await this._service.update(id, doc);
  }
}
