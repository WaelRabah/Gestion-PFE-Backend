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
  Request,
  Header,
  Res
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { Status } from 'src/enums/status.enum';
import { Role } from 'src/utilisateurs/enums/role.enum';
import { editFileName } from 'src/utils/EditFileName';
import CreateSuggestPfeDto from './dtos/create-suggest-pfe.dto';
import UpdateSuggestPfeDto from './dtos/update-suggest-pfe.dto';
import { SuggestPfeModel } from './suggest-pfe.model';
import { SuggestPfeService } from './suggest-pfe.service';
import SearchPfeSuggestionDTO from './dtos/search-pfe-suggestion.dto';
import { createReadStream } from 'fs';
import StatusChangeDTO from './dtos/status-change.dto';
import {Response} from 'express';
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

  @Roles(Role.Administrateur)
  @Put('valider/:id')
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 200, description: 'doc updated successfully.' })
  async validerSuggestionPFE(
    @Param('id') id,
    @Body() doc: StatusChangeDTO,
  ): Promise<SuggestPfeModel> {
    return await this._service.changeStatus(id, doc);
  }

  @Roles(Role.Administrateur,Role.Enseignant)
  @Get('pdf/:id')
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 200, description: 'got PDF successfully.' })
  @Header('Content-Type', 'application/pdf')
  async getPFE_PDF(
    @Param('id') id,
    @Res() res: Response
  ) {
    const suggestionPfe = await this._service.get(id);
    res.setHeader('Content-Disposition',`attachement; filename=${suggestionPfe.id}.pdf`)
    const file = createReadStream(suggestionPfe.filepath);
    file.pipe(res);
    return res;
  }

  @Roles(Role.Administrateur,Role.Enseignant)
  @Post('search')
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiBody({ type: SearchPfeSuggestionDTO })
  findSuggestions(
    @Body() query: SearchPfeSuggestionDTO
  ) : Promise<SuggestPfeModel[]> {
    return this._service.find(query);
  }
}
