import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import CreatePfesDto from './dtos/create-pfes.dto';
import UpdatePfesDto from './dtos/update-pfes.dto';
import { PfesModel } from './pfes.model';
import { PfesService } from './pfes.service';
import {editFileName} from '../utils/EditFileName';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { Status } from '../enums/status.enum';
import StatusChangeDTO from './dtos/status-change.dto';
import { createReadStream  } from 'fs';
import { fileURLToPath } from 'url';
import SearchPfeDTO from './dtos/search-pfe.dto';
import { Role } from 'src/utilisateurs/enums/role.enum';
import {Response} from 'express';
@ApiTags('pfes')
@Controller('pfes')
@UseGuards(AuthGuard('jwt'),RolesGuard)
export class PfesController {
  constructor(private readonly _service: PfesService) {}
  @Get()
  @ApiResponse({ status: 200, description: 'Ok' })
  async findAll(): Promise<PfesModel[]> {
    return await this._service.getAll();
  }
  @Get("/unassigned")
  @ApiResponse({ status: 200, description: 'Ok' })
  async findAllUnassigned(): Promise<PfesModel[]> {
    return await this._service.getAllUnassigned();
  }
  @Get(':id')
  @ApiResponse({ status: 200, description: 'doc retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'doc does not exist' })
  async findById(@Param('id') id: string): Promise<PfesModel> {
    return await this._service.get(id);
  }

  @Roles(Role.Etudiant)
  @Post()
  @UseInterceptors(FileInterceptor('file',{
    storage: diskStorage({
      destination: './uploads/sujets-pfes/',
      filename: editFileName
    })
  }))
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreatePfesDto })
  async create(@Body() doc :CreatePfesDto, @UploadedFile() file, @Request() req): Promise<PfesModel> {
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
  @ApiBody({ type: UpdatePfesDto })
  async update(
    @Param('id') id,
    @Body() doc: UpdatePfesDto,
  ): Promise<PfesModel> {
    return await this._service.update(id, doc);
  }

  @Roles(Role.Administrateur)
  @Put('valider/:id')
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 200, description: 'doc updated successfully.' })
  async validerPFE(
    @Param('id') id,
    @Body() doc: StatusChangeDTO,
  ): Promise<PfesModel> {
    return await this._service.changeStatus(id, doc);
  }

  @Roles(Role.Administrateur)
  @Get('pdf/:id')
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 200, description: 'got PDF successfully.' })
  @Header('Content-Type', 'application/pdf')
  async getPFE_PDF(
    @Param('id') id,
    @Res() res: Response
  ) {
    
    const sujetPFE = await this._service.get(id);
    res.setHeader('Content-Disposition',`attachement; filename=${sujetPFE.id}.pdf`)
    const file = createReadStream(sujetPFE.filepath);
    file.pipe(res);
    return res;
  }


  @Post('search')
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiBody({ type: CreatePfesDto })
  findPFEs(
    @Body() query: SearchPfeDTO
  ) : Promise<PfesModel[]> {
    return this._service.find(query);
  }

}
