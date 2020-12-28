import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Request
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import CreatePfesDto from 'src/pfes/dtos/create-pfes.dto';
import { Status } from 'src/enums/status.enum';
import { PfesModel } from 'src/pfes/pfes.model';
import { Role } from 'src/utilisateurs/enums/role.enum';
import { editFileName } from 'src/utils/EditFileName';
import CreateSuggestPfeDto from './dtos/create-suggest-pfe.dto';
import UpdateSuggestPfeDto from './dtos/update-suggest-pfe.dto';
import { SuggestPfeModel } from './suggest-pfe.model';
import { SuggestPfeService } from './suggest-pfe.service';
@ApiTags('suggest-pfe')
@UseGuards(AuthGuard('jwt'),RolesGuard)
@Controller('suggest-pfe')
export class SuggestPfeController {
  constructor(private readonly _service: SuggestPfeService) {}
  @Get()
  @ApiResponse({ status: 200, description: 'Ok' })
  async findAll(): Promise<SuggestPfeModel[]> {
    return await this._service.getAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'doc retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'doc does not exist' })
  async findById(@Param('id') id: string): Promise<SuggestPfeModel> {
    return await this._service.get(id);
  }

  @Roles(Role.Enseignant)
  @Post()
  @UseInterceptors(FileInterceptor('file',{
    storage: diskStorage({
      destination: './uploads/suggestions-pfes/',
      filename: editFileName
    })
  }))
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreateSuggestPfeDto })
  async create(@Body() doc :CreateSuggestPfeDto, @UploadedFile() file, @Request() req): Promise<SuggestPfeModel> {
    return await this._service.create(doc,file.path,Status.Attente,req.user);
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
  @ApiBody({ type: UpdateSuggestPfeDto })
  async update(
    @Param('id') id,
    @Body() doc: UpdateSuggestPfeDto,
  ): Promise<SuggestPfeModel> {
    return await this._service.update(id, doc);
  }
}
