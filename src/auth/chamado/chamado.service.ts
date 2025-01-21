import { Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChamadoDto } from './dto/create_chamado.dto';
import { AuthGuard } from '../auth.guard';
import { UpdateChamadoDto } from './dto/update_chamado.dto';
import { ReadByIdChamadoDto } from './dto/read_by_id_chamado.dto';
@UseGuards(AuthGuard)
@Injectable()
export class ChamadoService {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateChamadoDto) {
    try {
      const request = await this.prismaService.nato_chamados.create({
        data: {
          ...data,
        },
      });
      const dados: ReadByIdChamadoDto = {
        ...request,
        images: request.images ? JSON.parse(request.images) : [],
        images_adm: request.images_adm ? JSON.parse(request.images_adm) : [],
      }
      return dados
    } catch (error) {
      console.log("🚀 ~ ChamadoService ~ create ~ error:", error)
      throw error
    }
  }

  async getAll() {
    return await this.prismaService.nato_chamados.findMany({
      where: {
        status: { not: 2 },
      },
      orderBy: {
        status: 'asc',
      }
    });
  }

  async getOne(id: number) {
    return await this.prismaService.nato_chamados.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: UpdateChamadoDto, req: any) {
    return await this.prismaService.nato_chamados.update({
      where: {
        id,
      },
      data:{
        ...data,
        idResposta: req.user.id
      }
    });
  }
  
  async updateResposta(id: number, data: UpdateChamadoDto, req: any){

    return await this.prismaService.nato_chamados.update({
      where:{
        id,
      },
      data
    })
  }

  async delete(id: number) {
    return await this.prismaService.nato_chamados.update({
      where: {
        id,
      },
      data:{
        status: 3
      },
    });
  }

  async search(pesquisa: any) {
    try {
      const whereClause = { ...pesquisa }

      if(whereClause.idUser){
        whereClause.idUser = Number(whereClause.idUser)
      }
      return await this.prismaService.nato_chamados.findMany({
        where: whereClause
      });
    } catch (error) {
      
    }
  }

  async count() { 
    try { 
      return await this.prismaService.nato_chamados.count({
        where:{
          status: {
            not: 3,
        },
        }
      })
      
    }catch (error) {
      console.log(error)
      throw error
    }
  }
}
