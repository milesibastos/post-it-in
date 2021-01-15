import axios from "axios";
import handler from "./token";

jest.mock("axios");
jest.mock("firebase-functions", () => {
  return {
    config: () => ({linkedin: {}}),
  };
});

const access_token = "#access_token";
const post = axios.post as unknown as jest.Mock;
post.mockResolvedValue({data: {access_token}});

// Exchange Authorization Code for an Access Token
// https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin/consumer/context#step-3-exchange-authorization-code-for-an-access-token
test("should send code to request token", async () => {
  const headers = {"Content-Type": "application/x-www-form-urlencoded"};
  const token = await handler("xyz");
  expect(post)
      .toBeCalledWith(
          expect.any(String),
          expect.stringContaining("code=xyz"),
          {headers}
      );

  expect(token).toMatchSnapshot();
});
