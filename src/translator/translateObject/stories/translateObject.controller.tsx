import { useEffect, useState } from "react";
import { Text } from "@inubekit/inubekit";
import { translateObject } from "../index";

const backendData = {
  nombre: "Juan Pérez",
  estado: "ACTIVO",
  detalles: {
    rol: "Seguros Servicios",
    notas: "Compra de seguros y servicios en CONVENIOS.",
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
