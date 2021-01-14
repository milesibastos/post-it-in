import axios from "axios";
import handler from "./profile";

jest.mock("axios");

const get = axios.get as unknown as jest.Mock;
get.mockImplementation((url: string) => {
  if (url.includes("/v2/me")) {
    return {data: {
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
    }};
  }
  if (url.includes("/v2/emailAddress")) {
    return {data: {
      "elements": [
        {
          "handle~": {
            "emailAddress": "antonio+linkedin@milesibastos.com",
          },
          "handle": "urn:li:emailAddress:1234567890",
        },
      ],
    }};
  }

  return {data: {}};
});

// Retrieving Member Profiles
// https://docs.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin#retrieving-member-profiles
test("should fetch profile", async () => {
  const token = "#access_token";
  const config = {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  };
  const profile = await handler(token);
  expect(get)
      .toBeCalledWith(
          "https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~:playableStreams))",
          config
      );
  expect(get)
      .toBeCalledWith(
          "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
          config
      );

  expect(profile).toMatchSnapshot();
});
