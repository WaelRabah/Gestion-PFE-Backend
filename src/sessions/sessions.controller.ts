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
import CreateSessionsDto from './dtos/create-sessions.dto';
import UpdateSessionsDto from './dtos/update-sessions.dto';
import { SessionsModel } from './sessions.model';
import { SessionsService } from './sessions.service';
@ApiTags('sessions')
@Controller('sessions')
export class SessionsController {
  constructor(private readonly _service: SessionsService) {}
  @Get()
  @ApiResponse({ status: 200, description: 'Ok' })
  async findAll(): Promise<SessionsModel[]> {
    return await this._service.getAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'doc retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'doc does not exist' })
  async findById(@Param('id') id: string): Promise<SessionsModel> {
    return await this._service.get(id);
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
