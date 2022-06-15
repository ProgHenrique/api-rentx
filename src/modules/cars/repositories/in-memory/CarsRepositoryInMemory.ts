import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    category_id,
    brand,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      category_id,
      brand,
      specifications,
    });

    this.cars.push(car);

    return car;
  }

  async findPlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async list(
    brand?: string,
    name?: string,
    category_id?: string
  ): Promise<Car[]> {
    if (brand || name || category_id) {
      const car = this.cars.filter((car) => {
        if (
          // eslint-disable-next-line prettier/prettier
          car.available === true &&
          (brand && car.brand === brand) ||
          (name && car.name === name) ||
          (category_id && car.category_id === category_id)
        ) {
          return car;
        }

        return null;
      });

      return car;
    }

    return this.cars.filter((car) => car.available === true);
  }

  async findById(car_id: string): Promise<Car> {
    return this.cars.find((car) => car.id === car_id);
  }

  async uploadAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id);

    this.cars[findIndex].available = available;
  }
}

export { CarsRepositoryInMemory };
