import { PizzaSeeder } from './PizzaSeeder';
import { DataSource } from 'typeorm';
import { runSeeder, Seeder, SeederFactoryManager } from 'typeorm-extension';

export class MainSeeder implements Seeder{
 async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    await runSeeder(dataSource, PizzaSeeder);
  }
  
}