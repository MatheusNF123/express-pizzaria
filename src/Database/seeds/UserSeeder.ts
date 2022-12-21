import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import User from "../Entities/User";

export class UserSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    const user = {
      name: "admin",
      address: "rua admin 123",
      email: "admin@admin.com",
      password: "$2a$10$U2lefvwpTibt39GqR0h.O.Wj65KAdkIO6/6850sbMIDrZU5rqkhT6",
      phone: "(43) 99999-9999",
      role: "admin",
    };

    const userCreate = userRepository.create(user);
    
    await userRepository.save(userCreate);
  }
}
