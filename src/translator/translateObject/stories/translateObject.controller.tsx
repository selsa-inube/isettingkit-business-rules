import { useEffect, useState } from "react";
import { Text } from "@inubekit/inubekit";
import { translateObject } from "../index";

const backendData = {
  "0": {
    moneyDestinationId: "983e1dfa-092f-471c-9bfe-d3e515fdbea1",
    abbreviatedName: "Seguros Servicios",
    descriptionUse: "Purchase of insurance and services in CONVENIOS.",
    iconReference: "MdOutlineVolunteerActivism",
  },
  "1": {
    moneyDestinationId: "ddda2652-da8c-416d-8b7d-23dd05635839",
    abbreviatedName: "Emprendimiento",
    descriptionUse: "Investing in ventures.",
    iconReference: "MdOutlineLightbulb",
  },
  "2": {
    moneyDestinationId: "8bf6fa16-bc57-4a51-b4a4-d67975781459",
    abbreviatedName: "Tarjetas interna",
    descriptionUse: "Consumption with credit cards.",
    iconReference: "MdOutlineCreditCard",
  },
};

const config = {
  url: "https://libretranslate.inube.dev/translate",
  apiKey: "6c6fdf33-ece2-4848-ab4b-5abb267be2f6",
};

const TranslateObjectController = () => {
  const [translatedData, setTranslatedData] = useState<
    typeof backendData | null
  >(null);

  useEffect(() => {
    const fetchTranslation = async () => {
      const result = await translateObject(backendData, "en", config);
      setTranslatedData(result as typeof backendData);
    };

    fetchTranslation();
  }, []);

  return (
    <>
      <Text as="h3">Original Backend Data:</Text>
      <pre>{JSON.stringify(backendData, null, 2)}</pre>

      <Text as="h3">Translated Data (to English):</Text>
      <pre>
        {translatedData
          ? JSON.stringify(translatedData, null, 2)
          : "Translating..."}
      </pre>
    </>
  );
};

export { TranslateObjectController };
