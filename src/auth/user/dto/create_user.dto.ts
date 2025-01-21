import { IsEmail, IsNotEmpty, IsString, IsArray, ArrayMinSize, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Nome do usuário', example: 'John Doe' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString({ message: 'Nome deve ser uma string válida' })
  nome: string;

  @ApiProperty({ description: 'Nome de usuário', example: 'johndoe' })
  @IsNotEmpty({ message: 'Nome de usuário é obrigatório' })
  @IsString({ message: 'Nome de usuário deve ser uma string válida' })
  username: string;

  @ApiProperty({ description: 'Senha do usuário', example: '123456' })
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @IsString({ message: 'Senha deve ser uma string válida' })
  @Transform(({ value }) => value?.trim())
  password: string;

  @ApiPropertyOptional({ description: 'Telefone do usuário', example: '(11) 99999-9999' })
  @IsOptional()
  @IsString({ message: 'Telefone deve ser uma string válida' })
  @Transform(({ value }) => value?.trim())
  telefone?: string;

  @ApiProperty({ description: 'Email do usuário', example: 'johndoe@me.com' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Email inválido' })
  @Transform(({ value }) => value?.trim().toLowerCase())
  email: string;

  @ApiPropertyOptional({ description: 'CPF do usuário', example: '12345678900' })
  @IsOptional()
  @IsString({ message: 'CPF deve ser uma string válida' })
  @Transform(({ value }) => value?.replace(/\D/g, ''))
  cpf?: string;

  @ApiProperty({ description: 'Cargo do usuário', example: 'ADM' })
  @IsNotEmpty({ message: 'Cargo é obrigatório' })
  @IsString({ message: 'Selecionar um cargo' })
  cargo: string;

  @ApiPropertyOptional({ description: 'Construtora do usuário', example: ['1', '2'] })
  @IsOptional() 
  construtora?: string;

  @ApiPropertyOptional({ description: 'Empreendimento do usuário', example: ['1', '2'] })
  @IsOptional()
  empreendimento: string;

  @ApiPropertyOptional({ description: 'Hierarquia do usuário', example: 'ADM' })
  @IsOptional()
  @IsString({ message: 'Selecionar uma hierarquia' })
  hierarquia?: string;

  @ApiPropertyOptional({ description: 'Financeira do usuário', example: [1, 2] })
  @IsOptional()
  Financeira: string;

  @ApiProperty({ description: 'Confirmação de senha do usuário', example: '123456' })
  @IsNotEmpty({ message: 'Confirmação de senha é obrigatória' })
  @IsString({ message: 'Confirmação de senha deve ser uma string válida' })
  @Transform(({ value }) => value?.trim())
  passwordConfir: string

}