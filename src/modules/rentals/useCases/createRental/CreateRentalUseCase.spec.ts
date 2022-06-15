import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/infra/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

describe("Create car Rentals", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new car rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Test description",
      brand: "test brand",
      category_id: "1234",
      daily_rate: 100,
      fine_amount: 40,
      license_plate: "XXXXXX",
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "54321",
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new car rental when have current rent for same car", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "Car_Id",
      user_id: "54321",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "Car_Id",
        user_id: "11111",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is Unavailable!"));
  });

  it("should not be able to create a new car rental when have current rent for same user", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "Car_Id",
      user_id: "54321",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "12345",
        user_id: "54321",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress to user!"));
  });

  it("should not be able to create a new car rental with invalid date returned", async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: "Car_Id",
        user_id: "54321",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(
      new AppError("The return needs to be minimun than 24 hours")
    );
  });
});
