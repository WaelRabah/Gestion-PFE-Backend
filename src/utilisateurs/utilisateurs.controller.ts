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
import CreateUtilisateursDto from './dtos/create-utilisateurs.dto';
import UpdateUtilisateursDto from './dtos/update-utilisateurs.dto';
import ResetPasswordDTO from './dtos/reset-password.dto';
import AjoutEtudiantDTO from './dtos/ajout-etudiant.dto';
import AjoutEnseignantDTO from './dtos/ajout-enseignant.dto';

@ApiTags('utilisateurs')
@Controller('utilisateurs')
export class UtilisateursController {
  constructor(private readonly _service: UtilisateursService) {}


  @Post('/newEtudiant')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'The email is associated with an another account.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createEtudiant(
    @Body() doc: AjoutEtudiantDTO
    ){
    return this._service.createUser(doc);
  }

  @Post('/newEnseignant')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'The email is associated with an another account.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createEnseignant(
    @Body() doc: AjoutEnseignantDTO
    ){
    return this._service.createUser(doc);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiResponse({ status: 200, description: 'Ok' })
  async findAll(): Promise<UtilisateursModel[]> {
    return await this._service.getAll();
  }

  @Get(':role')
  @ApiResponse({ status: 200, description: 'Ok' })
  async findOnRole(@Param('role') role: string): Promise<UtilisateursModel[]> {
    return await this._service.getOnRole(role);
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
  @ApiBody({ type: CreateUtilisateursDto })
  async create(@Body() doc: CreateUtilisateursDto) {
    return await this._service.create(doc);
  }

  @Post('registerAll')
  @ApiResponse({
    status: 201,
    description: 'The recordq have been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreateUtilisateursDto })
  async createAll(@Body() doc: CreateUtilisateursDto[]) {
    return await this._service.createAll(doc);
  }

  @ApiResponse({
    status: 201,
    description: 'Email sent to the user',
  })
  @ApiResponse({ status: 401, description: 'The email address is not associated with any account' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post('recover')
  async recover(@Body() doc) {
    return await this._service.recoverPassword(doc.email);
  }

  @ApiResponse({
    status: 201,
    description: 'Password changed',
  })
  @ApiResponse({ status: 401, description: 'Password reset token is invalid or has expired.' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Passwords does not match' })
  @Post('reset/:token')
  async reset(@Param('token') token: string, @Body() doc:ResetPasswordDTO) {
    return this._service.resetPassword(token, doc);
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
  @ApiBody({ type: UpdateUtilisateursDto })
  async update(
    @Param('id') id,
    @Body() doc: UpdateUtilisateursDto,
  ): Promise<UtilisateursModel> {
    return await this._service.update(id, doc);
  }
}
