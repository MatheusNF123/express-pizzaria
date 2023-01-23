import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import User from "../Entities/User";

export class UserSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    const users = [{
      name: "admin",
      address: "rua admin 123",
      email: "admin@admin.com",
      password: "$2a$10$JCVQ7urnenJYzi4Td8Ndd.SEDlIv/y10kp5SEjt/qHxp1VSqvBbPC", //admin123
      phone: "(43) 99999-9999",
      role: "admin",
    },
    {
      name: "Python script",
      address: "Avenida paulista, 404",
      email: "python@script.com",
      password: "$2a$10$4dwrPvHY2GQFNlrRwcXi/OIhzGahwuzKzzSrtAdpu3OMM2gh6Wlu2", //python123
      phone: "(32) 94045-4404",
      role: "customer",
    }
    ];

    await userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(users)
      .execute();

    await userRepository.save(users);
  }
}
