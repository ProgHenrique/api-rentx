import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateCarDTO {
  name: string;
  description: string;
  license_plate: string;
  brand: string;
  daily_rate: number;
  fine_amount: number;
  category_id: string;
  specifications?: Specification[];
  id?: string;
}

export { ICreateCarDTO };
