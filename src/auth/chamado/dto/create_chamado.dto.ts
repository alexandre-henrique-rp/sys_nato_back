import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateIf,
} from 'class-validator';

/**
 * DTO para criar um chamado.
 * Valida e transforma os dados recebidos na requisição.
 */
export class CreateChamadoDto {
  /**
   * ID da solicitação associado ao chamado.
   * - Deve ser um número positivo.
   * - Obrigatório.
   */
  @ApiProperty({ description: 'ID da solicitação associado ao chamado', example: 123 })
  @IsNotEmpty({ message: 'Id do cliente é obrigatório' })
  @Type(() => Number) // Garante que o valor seja transformado em número
  solicitacao: number;

  /**
   * Descrição do chamado (assunto).
   * - Deve ser uma string.
   * - Obrigatório.
   */
  @ApiProperty({ description: 'Descrição do chamado (assunto)', example: 'Chamado de teste' })
  @IsNotEmpty({ message: 'Descrição é obrigatória' })
  descricao: string;

  /**
   * Status do chamado.
   *
   * - Deve ser um número positivo.
   * - Deve ser 0, 1, 2 ou 3.
   */
  @ApiProperty({ description: 'Status do chamado, 0 = iniciado, 1 = em andamento, 2 = enviado para NL2, 3 = concluído, 4 = cancelado', example: 0 })
  @IsIn([0], { message: 'Para criar um chamado, o status deve ser do tipo Aberto' })
  @Type(() => Number)
  status: number;

  /**
   * id do usuário que abriu o chamado.
   *
   * - Deve ser um número positivo.
   * - Obrigatório.
   */
  @ApiProperty({ description: 'id do usuário que abriu o chamado', example: 143 })
  @IsNotEmpty({ message: 'id do usuário é obrigatório' })
  idUser: number;

  /**
   * Lista de imagens associadas ao chamado.
   * - Deve ser um array de strings.
   * - Se fornecido, o array será transformado em uma única string no formato JSON.
   * - Opcional.
   */
  @ApiPropertyOptional({ type: [String], description: 'Lista de imagens associadas ao chamado', example: ['image1.jpg', 'image2.jpg'] })
  @IsOptional() // Campo não é obrigatório
  @ValidateIf((obj) => Array.isArray(obj.images)) // Valida apenas se o valor for um array
  @IsArray({ message: 'images deve ser um array' }) // Garante que seja um array
  @ArrayNotEmpty({ message: 'images não pode ser um array vazio' }) // Garante que o array não esteja vazio
  @IsString({ each: true, message: 'Cada item em images deve ser uma string' }) // Valida que todos os itens sejam strings
  @Transform(({ value }) => {
    // Transforma o array em uma string no formato JSON, se aplicável
    if (Array.isArray(value)) {
      return JSON.stringify(value);
    }
    return value;
  })
  images?: string; // Após a transformação, será uma string
}
