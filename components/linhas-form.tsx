"use client";
import {
  ArrowRight,
  Bike,
  Bus,
  CarFront,
  Footprints,
  Locate,
  MapPin,
} from "lucide-react";

import { Directions } from "@/components/directions";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";

interface Props {
  label: string;
  title: string;
  isEstacoes?: boolean;
}

export const estacoes = [
  {
    id: 1,
    name: "Osasco",
    line: 8,
    lat: -23.52775963434865,
    long: -46.77590544655914,
  },
  {
    id: 2,
    name: "Estação Pinheiros",
    line: 9,
    lat: -23.567388220215285,
    long: -46.70223193658771,
  },
  {
    id: 3,
    name: "Luz - Centro Histórico de São Paulo, São Paulo - SP, 01032-001",
    line: 4,
    lat: -23.53644109696544,
    long: -46.63425843517828,
  },
];

const formas_de_viagem = [
  {
    id: 1,
    name: "DRIVING",
    description: "Carro",
    icon: CarFront,
    travel_mode: "DRIVING",
  },
  {
    id: 2,
    name: "WALKING",
    description: "Andando",
    icon: Footprints,
    travel_mode: "WALKING",
  },
  {
    id: 3,
    name: "TRANSIT",
    description: "Transporte público",
    icon: Bus,
    travel_mode: "TRANSIT",
  },
  {
    id: 4,
    description: "Bicicleta",
    name: "BICYCLING",
    icon: Bike,
    travel_mode: "BICYCLING",
  },
];

export function LinhasForm({ label, title, isEstacoes }: Props) {
  const [selectedTravelMode, setSelectedTravelMode] = useState("DRIVING");
  const destinationRef = useRef<HTMLSelectElement>(null);
  const originRef = useRef<HTMLInputElement>(null);

  const [destinationValue, setDestinationValue] = useState("");
  const [originValue, setOriginValue] = useState("");
  const [routeUpdated, setRouteUpdated] = useState(false);
  const [userLocation, setUserLocation] = useState("");

  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        )
          .then((response) => response.json())
          .then((data) => {
            setUserLocation(data.results[0].formatted_address);
          });
      });
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  }

  function calculateRoute() {
    if (destinationRef.current && originRef.current) {
      setDestinationValue(destinationRef.current.value);
      setOriginValue(originRef.current.value);
      setRouteUpdated((prev) => !prev);
    }
  }

  useEffect(() => {
    if (originValue && destinationValue) {
      calculateRoute();
    }
  }, [originValue, destinationValue, selectedTravelMode]);

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <>
      <section
        className="relative bg-[url('/subway.jpg')] h-[750px] w-full bg-cover bg-no-repeat"
        aria-labelledby="mapa-titulo"
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-[1000px] mx-auto relative">
          <div className="absolute top-[182px] left-1/2 transform -translate-x-1/2 w-full max-w-[1000px]">
            <h1
              id="mapa-titulo"
              className="text-[50px] text-white leading-[1.2] font-bold"
            >
              {title}
            </h1>
            <div className="absolute w-[90vw] left-1/2 transform -translate-x-1/2 bg-white shadow-2xl rounded-[30px] p-5 mt-5">
              <div className="w-full mx-auto">
                <strong className="text-[28px] text-black">{label}</strong>
                <form
                  role="search"
                  aria-labelledby="busca-titulo"
                  className="mt-10 flex gap-3"
                >
                  <div className="w-full flex flex-col gap-2">
                    <label
                      htmlFor="linha"
                      className="font-semibold text-[16px]"
                    >
                      Origem
                    </label>
                    <div className="relative mt-4">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none">
                        <Locate />
                      </div>
                      <input
                        type="text"
                        defaultValue={userLocation}
                        name="origin"
                        placeholder="Local de origem"
                        ref={originRef}
                        onChange={(ev) => {
                          setUserLocation(ev.target.value);
                          originRef.current!.value = ev.target.value;
                        }}
                        className="w-full pl-12 pr-4 py-5 bg-gray-100 rounded-[10px] border-none text-[20px] font-medium"
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label
                      htmlFor="linha"
                      className="font-semibold text-[16px]"
                    >
                      Destino
                    </label>
                    <div className="relative mt-4">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none">
                        <MapPin />
                      </div>
                      <select
                        id="estacao"
                        className="w-full pl-12 pr-10 py-5 bg-gray-100 rounded-[10px] border-none text-[20px] font-medium appearance-none"
                        name="estacao"
                        ref={destinationRef}
                        defaultValue={""}
                      >
                        <option value="" disabled className="text-gray-600">
                          Selecione a estação
                        </option>
                        {estacoes.map((estacao) => (
                          <option key={estacao.id} value={estacao.name}>
                            {estacao.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </form>
                <div className="flex gap-3 py-5">
                  {formas_de_viagem.map((item) => (
                    <div
                      key={item.id}
                      title={item.description}
                      className={`p-3 cursor-pointer border-2 rounded-[12px] ${
                        item.travel_mode === selectedTravelMode
                          ? "border-none bg-[#c9f95e]"
                          : "border-gray-300 bg-transparent"
                      }`}
                      onClick={() => setSelectedTravelMode(item.travel_mode)}
                    >
                      <item.icon className="text-black" />
                    </div>
                  ))}
                </div>
                <div className="w-full flex justify-end">
                  <button
                    onClick={calculateRoute}
                    className="h-[55px] w-[220px] flex items-center rounded-[50px] bg-black text-white text-[16px] font-semibold mt-10 px-6 relative"
                  >
                    Buscar
                    <div className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center text-black absolute right-[2px]">
                      <ArrowRight />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isEstacoes && originValue && destinationValue && (
        <div className="flex justify-center items-center h-screen">
          <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
            <Map
              mapId={"dajgdasdw"}
              style={{ width: "1200px", height: "500px" }}
              defaultZoom={20}
              gestureHandling={"greedy"}
              disableDefaultUI={true}
            >
              <Directions
                key={String(routeUpdated)}
                origin={userLocation}
                destination={destinationValue}
                travelMode={selectedTravelMode}
              />
            </Map>
          </APIProvider>
        </div>
      )}
    </>
  );
}
