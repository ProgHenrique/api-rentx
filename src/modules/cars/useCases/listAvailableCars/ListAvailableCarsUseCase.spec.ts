import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe("List all Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car1 description",
      brand: "Car1 brand",
      license_plate: "XXX-1234",
      daily_rate: 100,
      fine_amount: 50,
      category_id: "Id category sample",
    });

    await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car2 description",
      brand: "Car2 brand",
      license_plate: "ABC-1234",
      daily_rate: 150,
      fine_amount: 80,
      category_id: "Id category example",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars.length).toBeGreaterThanOrEqual(1);
  });

  it("should be able to list all available cars by brand", async () => {
    await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car1 description",
      brand: "Car1 brand",
      license_plate: "XXX-1234",
      daily_rate: 100,
      fine_amount: 50,
      category_id: "Id category sample",
    });

    await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car2 description",
      brand: "Car2 brand",
      license_plate: "ABC-1234",
      daily_rate: 150,
      fine_amount: 80,
      category_id: "Id category example",
    });

    const car = await listAvailableCarsUseCase.execute({ brand: "Car2 brand" });

    expect(car[0].brand).toEqual("Car2 brand");
  });

  it("should be able to list all available cars by name", async () => {
    await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car1 description",
      brand: "Car1 brand",
      license_plate: "XXX-1234",
      daily_rate: 100,
      fine_amount: 50,
      category_id: "Id category sample",
    });

    await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car2 description",
      brand: "Car2 brand",
      license_plate: "ABC-1234",
      daily_rate: 150,
      fine_amount: 80,
      category_id: "Id category example",
    });

    const car = await listAvailableCarsUseCase.execute({ name: "Car2" });

    expect(car[0].name).toEqual("Car2");
  });

  it("should be able to list all available cars by category_id", async () => {
    await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car1 description",
      brand: "Car1 brand",
      license_plate: "XXX-1234",
      daily_rate: 100,
      fine_amount: 50,
      category_id: "Id category sample",
    });

    await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car2 description",
      brand: "Car2 brand",
      license_plate: "ABC-1234",
      daily_rate: 150,
      fine_amount: 80,
      category_id: "Id category example",
    });

    const car = await listAvailableCarsUseCase.execute({
      category_id: "Id category example",
    });

    expect(car[0].category_id).toEqual("Id category example");
  });
});
