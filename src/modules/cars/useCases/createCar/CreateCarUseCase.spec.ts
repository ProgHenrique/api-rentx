import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/infra/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      brand: "Car Brand",
      category_id: "Id category",
      license_plate: "123-ABC",
      daily_rate: 150,
      fine_amount: 100,
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a new car when have another car with same license_plate", async () => {
    await createCarUseCase.execute({
      name: "Car1",
      description: "Description Car",
      brand: "Car Brand",
      category_id: "Id category",
      license_plate: "123-ABC",
      daily_rate: 150,
      fine_amount: 100,
    });

    await expect(
      createCarUseCase.execute({
        name: "Car2",
        description: "Description Car",
        brand: "Car Brand",
        category_id: "Id category",
        license_plate: "123-ABC",
        daily_rate: 150,
        fine_amount: 100,
      })
    ).rejects.toEqual(new AppError("Car already exists in registers!"));
  });

  it("Should be able to create a new car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      brand: "Car Brand",
      category_id: "Id category",
      license_plate: "123-ABC",
      daily_rate: 150,
      fine_amount: 100,
    });

    expect(car.available).toBe(true);
  });
});
