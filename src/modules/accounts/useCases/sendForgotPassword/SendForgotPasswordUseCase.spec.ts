import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/infra/errors/AppError";

import { SendForgotPasswordUseCase } from "./SendForgotPasswordUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;
let sendForgotPasswordUseCase: SendForgotPasswordUseCase;

describe("Send forgot mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordUseCase = new SendForgotPasswordUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot paswword mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "751588",
      email: "higrawupu@nodter.bv",
      name: "Virgie Russell",
      password: "1234",
    });

    await sendForgotPasswordUseCase.execute("higrawupu@nodter.bv");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an mail if user does not exists", async () => {
    await expect(
      sendForgotPasswordUseCase.execute("kisah@buiko.fr")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create"
    );

    await usersRepositoryInMemory.create({
      driver_license: "406380",
      email: "cizo@re.mp",
      name: "Jeanette Fields",
      password: "1234",
    });

    await sendForgotPasswordUseCase.execute("cizo@re.mp");

    expect(generateTokenMail).toBeCalled();
  });
});
