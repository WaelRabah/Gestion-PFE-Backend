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
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UtilisateursModel } from './utilisateurs.model';
import { UtilisateursService } from './utilisateurs.service';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('utilisateurs')
@Controller('utilisateurs')
export class UtilisateursController {

  constructor(private readonly _service: UtilisateursService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiResponse({ status: 200, description: 'Ok' })
  async findAll(): Promise<UtilisateursModel[]> {
    return await this._service.getAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'doc retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'doc does not exist' })
  async findById(@Param('id') id: string): Promise<UtilisateursModel> {
    return await this._service.get(id);
  }

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: UtilisateursModel })
  async create(@Body() doc: UtilisateursModel) {
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
  @ApiBody({ type: UtilisateursModel })
  async update(
    @Param('id') id,
    @Body() doc: UtilisateursModel,
  ): Promise<UtilisateursModel> {
    return await this._service.update(id, doc);
  }
}
