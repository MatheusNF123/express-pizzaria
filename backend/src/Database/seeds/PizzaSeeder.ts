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
        img: `${BASE_URL}/images/pizza-4-queijos.jpg`,
      },
      {
        flavor: "Calabresa",
        type: "Salgado",
        price: 30.00,
        ingredients: ["Queijo", "calabresa", "cebola", "oregano"],
        img: `${BASE_URL}/images/pizza-calabresa.jpg`,
      },
      {
        flavor: "Pepperoni",
        type: "Salgado",
        price: 29.90,
        ingredients: ["Queijo", "oregano", "pepperoni"],
        img: `${BASE_URL}/images/pizza-peperoni.jpg`,
      },
      {
        flavor: "Portuguesa",
        type: "Salgado",
        price: 33.90,
        ingredients: ["molho de tomate", "muçarela", "presunto", "ovos", "cebola", "azeitona", "pimentão"],
        img: `${BASE_URL}/images/pizza-portuguesa.png`,
      },
      {
        flavor: "Frango com Catupiry",
        type: "Salgado",
        price: 31.90,
        ingredients: ["frango desfiado", "catupiry", "cebola", "milho"],
        img: `${BASE_URL}/images/pizza-frango-catupiry.png`,
      },
      {
        flavor: "Napolitana",
        type: "Salgado",
        price: 28.90,
        ingredients: ["Queijo", "tomate", "oregano", "parmesão", "ralado"],
        img: `${BASE_URL}/images/pizza-napolitana.jpg`,
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
        img: `${BASE_URL}/images/pizza-prestigio.jpg`,
      },
      {
        flavor: "Chocolate",
        type: "Doce",
        price: 29.00,
        ingredients: ["chocolate artesanal", "morango", "leite Condensado"],
        img: `${BASE_URL}/images/pizza-chocolate.jpg`,
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
        img: `${BASE_URL}/images/pizza-sonho-de-valsa.jpg`,
      },
      {
        flavor: "Banana com canela",
        type: "Doce",
        price: 28.90,
        ingredients: ["banana", "canela", "licor de cacau"],
        img: `${BASE_URL}/images/pizza-banana-canela.webp`,
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
