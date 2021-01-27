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
import CreateSessionsDto from './dtos/create-sessions.dto';
import UpdateSessionsDto from './dtos/update-sessions.dto';
import { SessionsModel } from './sessions.model';
import { SessionsService } from './sessions.service';
@ApiTags('sessions')
@Controller('sessions')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class SessionsController {
  constructor(private readonly _service: SessionsService) { }
  @Get()
  @ApiResponse({ status: 200, description: 'Ok' })
  async findAll(): Promise<SessionsModel[]> {
    return await this._service.getAll();
  }


  @Get('pdf/:id')
  async download(
    @Param('id') id: string
  ){
    return await this._service.createPDF(id);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'doc retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'doc does not exist' })
  async findById(@Param('id') id: string): Promise<SessionsModel> {
    return await this._service.get(id);
  }

  @Get('/archive/:id')
  @ApiResponse({ status: 200, description: 'doc retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'doc does not exist' })
  async archive(@Param('id') id: string): Promise<SessionsModel[]> {

    return await this._service.archive(id);
  }
  @Get('/restore/:id')
  @ApiResponse({ status: 200, description: 'doc retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'doc does not exist' })
  async restore(@Param('id') id: string): Promise<SessionsModel[]> {

    return await this._service.restore(id);
  }
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreateSessionsDto })
  async create(@Body() doc: CreateSessionsDto): Promise<SessionsModel> {
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
  @ApiBody({ type: UpdateSessionsDto })
  async update(
    @Param('id') id,
    @Body() doc: UpdateSessionsDto,
  ): Promise<SessionsModel> {
    return await this._service.update(id, doc);
  }


}
