import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';



@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  async executeSeed() {
    try {
      await this.pokemonModel.deleteMany({})
      const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')
  
      const insertPromiseArray = [];
  
      data.results.forEach(({name, url}) => {
        const segments = url.split('/')
        const no:number = +segments[segments.length - 2]
        // await this.pokemonModel.create({ name, no })
        insertPromiseArray.push(this.pokemonModel.create({ name, no }))
      })
      await Promise.all(insertPromiseArray)
      return 'Seed executed';
    } catch (error) {
      console.log(error)
    }
  }

}
