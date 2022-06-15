import { ICreateCarDTO } from "../dtos/ICreateCarsDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findPlate(license_plate: string): Promise<Car>;
  list(brand?: string, name?: string, category_id?: string): Promise<Car[]>;
  findById(car_id: string): Promise<Car>;
  uploadAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
