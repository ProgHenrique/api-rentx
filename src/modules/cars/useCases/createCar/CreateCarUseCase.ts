import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/infra/errors/AppError";

interface IRequest {
  name: string;
  description: string;
  license_plate: string;
  brand: string;
  daily_rate: number;
  fine_amount: number;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    name,
    description,
    brand,
    category_id,
    license_plate,
    daily_rate,
    fine_amount,
  }: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findPlate(license_plate);

    if (carAlreadyExists) {
      throw new AppError("Car already exists in registers!");
    }

    const car = await this.carsRepository.create({
      name,
      description,
      brand,
      category_id,
      license_plate,
      daily_rate,
      fine_amount,
    });

    return car;
  }
}

export { CreateCarUseCase };
