import { getRepository, Repository } from "typeorm";

import { ICreateUsersTokensDTO } from "@modules/accounts/dtos/ICreateUsersTokensDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

import { UserTokens } from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
  private respository: Repository<UserTokens>;

  constructor() {
    this.respository = getRepository(UserTokens);
  }

  async create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUsersTokensDTO): Promise<UserTokens> {
    const userToken = this.respository.create({
      user_id,
      refresh_token,
      expires_date,
    });

    await this.respository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const userTokens = await this.respository.findOne({
      user_id,
      refresh_token,
    });

    return userTokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.respository.delete(id);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = await this.respository.findOne({ refresh_token });

    return userToken;
  }
}

export { UsersTokensRepository };
