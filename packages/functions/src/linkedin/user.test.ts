import "firebase-admin";
import customToken from "./user";

const getUserByEmail = jest.fn();
const createUser = jest.fn();
const createCustomToken = jest.fn();
jest.mock("firebase-admin", () => {
  return {
    auth: () => ({getUserByEmail, createUser, createCustomToken}),
  };
});

test("should search user by email", async () => {
  getUserByEmail.mockResolvedValue({uid: "123", email: "a@b.c"});
  await customToken({email: "a@b.c"});
  expect(getUserByEmail).toBeCalledWith("a@b.c");
});

describe("when user exist", () => {
  beforeAll(() => {
    getUserByEmail.mockReset();
  });
  it("should create a custom token for the actual user", async () => {
    getUserByEmail.mockResolvedValue({uid: "123", email: "a@b.c"});
    await customToken({email: "a@b.c"});
    expect(createUser).not.toBeCalled();
    expect(createCustomToken).toBeCalledWith("123");
  });
});

describe("when user do not exist", () => {
  const user = {email: "a@b.c", displayName: "Letícia", photoURL: "http://leleka.photo/leleka.jpg"};

  beforeAll(() => {
    getUserByEmail.mockReset();
    createUser.mockReset();
    getUserByEmail.mockRejectedValue(new Error("Async error"));
    createUser.mockResolvedValue({...user, uid: "1234567890"});
  });

  it("should create a new user", async () => {
    await customToken(user);
    expect(createUser).toBeCalledWith(expect.objectContaining(user));
  });

  it("should create a custom token for the new user", async () => {
    await customToken(user);
    expect(createCustomToken).toBeCalledWith("1234567890");
  });
});
