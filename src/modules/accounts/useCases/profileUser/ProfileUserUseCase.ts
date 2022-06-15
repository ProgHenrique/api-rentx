import { inject, injectable } from "tsyringe";

import { IUserRepositoryDTO } from "@modules/accounts/dtos/IUserRepositoryDTO";
import { UserMap } from "@modules/accounts/mapper/UserMap";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<IUserRepositoryDTO> {
    const userProfile = await this.usersRepository.findById(id);

    return UserMap.toDTO(userProfile);
  }
}

export { ProfileUserUseCase };
