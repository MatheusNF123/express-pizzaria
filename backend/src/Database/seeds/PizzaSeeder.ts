import "dotenv/config";

import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import Pizza from "../Entities/Pizza";

const { BASE_URL = "http://localhost:3001" } = process.env;

export class PizzaSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const pizzaRepository = dataSource.getRepository(Pizza);

    const pizzaData = [
      {
        flavor: "Quatro Queijos",
        type: "Salgado",
        price: 29.50,
        ingredients: [
          "Queijo",
          "requeijão",
          "gorgonzola",
          "oregano",
          "parmesão ralado",
        ],
        img: "https://user-images.githubusercontent.com/99821267/236548741-50fc645f-854e-4683-b8f9-5d09d5fab279.jpg",
      },
      {
        flavor: "Calabresa",
        type: "Salgado",
        price: 30.00,
        ingredients: ["Queijo", "calabresa", "cebola", "oregano"],
        img: "https://user-images.githubusercontent.com/99821267/236548744-01ce96a3-09c3-4962-9906-1d20424c2d6e.jpg",
      },
      {
        flavor: "Pepperoni",
        type: "Salgado",
        price: 29.90,
        ingredients: ["Queijo", "oregano", "pepperoni"],
        img: "https://user-images.githubusercontent.com/99821267/236548757-0d6c2cf0-2d65-406b-b139-b0cea245c817.jpg",
      },
      {
        flavor: "Portuguesa",
        type: "Salgado",
        price: 33.90,
        ingredients: ["molho de tomate", "muçarela", "presunto", "ovos", "cebola", "azeitona", "pimentão"],
        img: "https://user-images.githubusercontent.com/99821267/236548758-659ee4ae-cc0a-4b9b-8586-4c24f869a3f3.png",
      },
      {
        flavor: "Frango com Catupiry",
        type: "Salgado",
        price: 31.90,
        ingredients: ["frango desfiado", "catupiry", "cebola", "milho"],
        img: "https://user-images.githubusercontent.com/99821267/236548752-e91242ce-0aef-403f-ba04-2fcb0fc441cb.png",
      },
      {
        flavor: "Napolitana",
        type: "Salgado",
        price: 28.90,
        ingredients: ["Queijo", "tomate", "oregano", "parmesão", "ralado"],
        img: "https://user-images.githubusercontent.com/99821267/236548754-18a72eb0-93c3-414a-be74-f3af5adecd3e.jpg",
      },
      {
        flavor: "Prestigio",
        type: "Doce",
        price: 30.50,
        ingredients: [
          "chocolate",
          "coco Ralado",
          "leite Condensado",
          "cerejas",
        ],
        img: "https://user-images.githubusercontent.com/99821267/236548760-bb1c2409-e27c-4617-beaf-d0609878ce57.jpg",
      },
      {
        flavor: "Chocolate",
        type: "Doce",
        price: 29.00,
        ingredients: ["chocolate artesanal", "morango", "leite Condensado"],
        img: "https://user-images.githubusercontent.com/99821267/236548748-d8efffdd-dea8-4846-b83c-c377d576861a.jpg",
      },
      {
        flavor: "Sonho de valsa",
        type: "Doce",
        price: 31.90,
        ingredients: [
          "Muçarela",
          "Chocolate ao leite",
          "pedaços de bombom Sonho de Valsa",
        ],
        img: "https://user-images.githubusercontent.com/99821267/236548763-b3f14498-5434-42a7-b75e-df5f854c5196.jpg",
      },     
    ];

    await pizzaRepository
      .createQueryBuilder()
      .insert()
      .into(Pizza)
      .values(pizzaData)
      .execute();

    await pizzaRepository.save(pizzaData);
  }
}
