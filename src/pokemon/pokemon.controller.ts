import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger/dist'

import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { PaginationDTO } from 'src/common/dto/pagination.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Create pokemon'})
  @ApiResponse({ status: 400, description: 'Bad request'})
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get prokemons by limit or offset parameters'})
  @ApiResponse({ status: 400, description: 'Bad request'})
  findAll(@Query() paginationDTO: PaginationDTO ) {
    return this.pokemonService.findAll(paginationDTO);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get pokemon by id'})
  @ApiResponse({ status: 400, description: 'Bad request'})
  findOne(@Param('id') id: string) {
    return this.pokemonService.findOne(id);
  }

  @Patch(':term')
  @ApiResponse({ status: 200, description: 'Updated pokemon'})
  @ApiResponse({ status: 400, description: 'Bad request'})
  update(@Param('term') term: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(term, updatePokemonDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Deleted pokemon'})
  @ApiResponse({ status: 400, description: 'Bad request'})
  remove(@Param('id', ParseMongoIdPipe ) id: string) {
    return this.pokemonService.remove(id);
  }
}
