import nock from "nock";
import handler from "./linkedin";
import createCustomToken from "./user";

jest.mock("./user");
jest.mock("firebase-functions", () => {
  return {
    config: () => ({linkedin: {}}),
  };
});

nock("https://www.linkedin.com")
    .post("/oauth/v2/accessToken")
    .reply(200, {access_token: "#access_token"});

nock("https://api.linkedin.com")
    .get((uri) => uri.includes("/v2/me?projection"))
    .reply(200, {
      "localizedLastName": "Milesi Bastos",
      "profilePicture": {
        "displayImage": "urn:li:digitalmediaAsset:C4D03AQGO_aSu5EocyA",
        "displayImage~": {
          "paging": {
            "count": 10,
            "start": 0,
            "links": [],
          },
          "elements": [
            {
              "artifact": "urn:li:digitalmediaMediaArtifact:(urn:li:digitalmediaAsset:C4D03AQGO_aSu5EocyA,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_100_100)",
              "authorizationMethod": "PUBLIC",
              "data": {
                "com.linkedin.digitalmedia.mediaartifact.StillImage": {
                  "mediaType": "image/jpeg",
                  "rawCodecSpec": {
                    "name": "jpeg",
                    "type": "image",
                  },
                  "displaySize": {
                    "width": 100.0,
                    "uom": "PX",
                    "height": 100.0,
                  },
                  "storageSize": {
                    "width": 100,
                    "height": 100,
                  },
                  "storageAspectRatio": {
                    "widthAspect": 1.0,
                    "heightAspect": 1.0,
                    "formatted": "1.00:1.00",
                  },
                  "displayAspectRatio": {
                    "widthAspect": 1.0,
                    "heightAspect": 1.0,
                    "formatted": "1.00:1.00",
                  },
                },
              },
              "identifiers": [
                {
                  "identifier": "https://media-exp1.licdn.com/dms/image/C4D03AQGO_aSu5EocyA/profile-displayphoto-shrink_100_100/0/1586103177020?e=1616025600&v=beta&t=UN-V9n5EOqtsC0NCkJOhZn_kO98DnCrfVZ25XYCByaE",
                  "index": 0,
                  "mediaType": "image/jpeg",
                  "file": "urn:li:digitalmediaFile:(urn:li:digitalmediaAsset:C4D03AQGO_aSu5EocyA,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_100_100,0)",
                  "identifierType": "EXTERNAL_URL",
                  "identifierExpiresInSeconds": 1616025600,
                },
              ],
            },
          ],
        },
      },
      "id": "1234567890",
      "localizedFirstName": "Antonio",
    });

nock("https://api.linkedin.com")
    .get((uri) => uri.includes("/v2/emailAddress"))
    .reply(200, {
      "elements": [
        {
          "handle~": {
            "emailAddress": "antonio+linkedin@milesibastos.com",
          },
          "handle": "urn:li:emailAddress:1234567890",
        },
      ],
    });

const profile = {
  id: "1234567890",
  email: "antonio+linkedin@milesibastos.com",
  displayName: "Antonio Milesi Bastos",
  photoURL: "https://media-exp1.licdn.com/dms/image/C4D03AQGO_aSu5EocyA/profile-displayphoto-shrink_100_100/0/1586103177020?e=1616025600&v=beta&t=UN-V9n5EOqtsC0NCkJOhZn_kO98DnCrfVZ25XYCByaE",
};

test("send should be called", async () => {
  const send = jest.fn((payload) => {
    // expect(payload).toMatchSnapshot();
  });
  const req: any = {query: {code: "xyz"}};
  const resp: any = {send};

  await handler(req, resp);
  expect(createCustomToken).toBeCalledWith(profile);
  expect(send).toBeCalled();
});
