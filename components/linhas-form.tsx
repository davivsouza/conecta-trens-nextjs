"use client";
import { ArrowRight, Clock, Locate, MapPin, TrainFront } from "lucide-react";
import { Directions } from "@/components/directions";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";

interface Props {
  label: string;
  title: string;
  isEstacoes?: boolean;
}

interface Estacao {
  id: number;
  name: string;
  line: number;
  lat: number;
  long: number;
}

interface TransitInfo {
  departureTime: {
    text: string;
    value: number;
  };
  arrivalTime: {
    text: string;
    value: number;
  };
  departureStop: {
    name: string;
    location: {
      lat: number;
      lng: number;
    };
  };
  arrivalStop: {
    name: string;
    location: {
      lat: number;
      lng: number;
    };
  };
  headsign: string;
  line: {
    name: string;
    short_name: string;
    color: string;
    text_color: string;
  };
  numStops: number;
}

export const estacoes = [
  { id: 1, name: "Osasco", line: 8, lat: -23.52776, long: -46.7759 },
  {
    id: 2,
    name: "Estação Pinheiros",
    line: 9,
    lat: -23.56739,
    long: -46.70223,
  },
  { id: 3, name: "Luz", line: 4, lat: -23.53644, long: -46.63426 },
  {
    id: 4,
    name: "Estação Mauá",
    line: 710,
    lat: -23.6681812,
    long: -46.4617156,
  },
];

export function LinhasForm({ label, title, isEstacoes }: Props) {
  const destinationRef = useRef<HTMLSelectElement>(null);
  const [nearestStation, setNearestStation] = useState<Estacao | null>(null);
  const [selectedStation, setSelectedStation] = useState<string>("");
  const [destinationStation, setDestinationStation] = useState<string>("");
  const [transitInfo, setTransitInfo] = useState<TransitInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [routeUpdated, setRouteUpdated] = useState(false);
  const [minutesToArrival, setMinutesToArrival] = useState<number | null>(null);

  // Obter localização do usuário e encontrar estação mais próxima
  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // Encontrar a estação mais próxima
          const nearest = findNearestStation(lat, lng);
          setNearestStation(nearest);
          setSelectedStation(nearest.name);
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
          setError(
            "Não foi possível obter sua localização atual. Por favor, selecione uma estação manualmente."
          );
        }
      );
    } else {
      setError(
        "Seu navegador não suporta geolocalização. Por favor, selecione uma estação manualmente."
      );
    }
  }

  // Calcular estação mais próxima com base na localização do usuário
  function findNearestStation(userLat: number, userLng: number): Estacao {
    return estacoes.reduce((nearest, station) => {
      const distCurrent = Math.sqrt(
        Math.pow(userLat - station.lat, 2) + Math.pow(userLng - station.long, 2)
      );
      const distNearest = Math.sqrt(
        Math.pow(userLat - nearest.lat, 2) + Math.pow(userLng - nearest.long, 2)
      );
      return distCurrent < distNearest ? station : nearest;
    }, estacoes[0]);
  }

  // Calcular minutos para a chegada do trem com base nos dados da API
  function calculateMinutesToArrival(departureTimeValue: number): number {
    const now = Math.floor(Date.now() / 1000); // Tempo atual em segundos (UNIX timestamp)
    const secondsToArrival = departureTimeValue - now;
    return Math.max(0, Math.floor(secondsToArrival / 60)); // Retorna 0 se for negativo
  }

  // Buscar informações do próximo trem
  async function fetchTransitData() {
    if (!selectedStation || !destinationStation) {
      setError("Por favor, selecione estações de origem e destino.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Construir a URL para sua API ou proxy que chama a Google Directions API
      const originStation = estacoes.find((e) => e.name === selectedStation);
      const destStation = estacoes.find((e) => e.name === destinationStation);

      if (!originStation || !destStation) {
        throw new Error("Estação não encontrada");
      }

      // Usando a API do Google Directions através do seu backend
      const response = await fetch(
        `/api/directions?origin=${originStation.lat},${originStation.long}&destination=${destStation.lat},${destStation.long}`
      );

      if (!response.ok) {
        throw new Error("Falha ao obter dados de trânsito");
      }

      const data = await response.json();
      console.log("RESPOSTA >>>", data);

      // Processar a resposta para extrair os dados de trânsito
      if (
        data &&
        data.routes &&
        data.routes.length > 0 &&
        data.routes[0].legs &&
        data.routes[0].legs.length > 0 &&
        data.routes[0].legs[0].steps
      ) {
        // Encontrar o primeiro passo que é de trânsito
        const transitStep = data.routes[0].legs[0].steps.find(
          (step: any) => step.travel_mode === "TRANSIT"
        );

        if (transitStep && transitStep.transit_details) {
          const details = transitStep.transit_details;

          // Construir o objeto de informações de trânsito
          const transitDetails: TransitInfo = {
            departureTime: details.departure_time,
            arrivalTime: details.arrival_time,
            departureStop: details.departure_stop,
            arrivalStop: details.arrival_stop,
            headsign: details.headsign,
            line: details.line,
            numStops: details.num_stops,
          };

          setTransitInfo(transitDetails);

          // Calcular minutos até a chegada
          const minutesToArrival = calculateMinutesToArrival(
            transitDetails.departureTime.value
          );
          setMinutesToArrival(minutesToArrival);
        } else {
          throw new Error(
            "Nenhuma informação de trânsito encontrada para esta rota"
          );
        }
      } else {
        throw new Error("Não foi possível encontrar uma rota de trânsito");
      }
    } catch (error) {
      console.error("Erro ao buscar dados de trânsito:", error);
      setError(
        "Não foi possível obter informações do próximo trem. Por favor, tente novamente."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSearch() {
    if (destinationRef.current) {
      setDestinationStation(destinationRef.current.value);
      setRouteUpdated((prev) => !prev);
      fetchTransitData();
    }
  }

  useEffect(() => {
    getUserLocation();
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.google) {
      setGoogleLoaded(true);
    }
  });

  // Atualizar o contador de minutos a cada minuto
  useEffect(() => {
    if (!transitInfo) return;

    const timer = setInterval(() => {
      const minutesToArrival = calculateMinutesToArrival(
        transitInfo.departureTime.value
      );
      setMinutesToArrival(minutesToArrival);

      // Se o trem já chegou, buscar novos dados
      if (minutesToArrival <= 0) {
        fetchTransitData();
      }
    }, 60000); // Atualiza a cada minuto

    return () => clearInterval(timer);
  }, [transitInfo]);

  return (
    <>
      <section
        className="relative bg-[url('/subway.jpg')] h-[750px] w-full bg-cover bg-no-repeat"
        aria-labelledby="mapa-titulo"
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-[1000px] mx-auto  relative
        ">
          <div className="absolute top-[182px] left-1/2 transform -translate-x-1/2 w-full max-w-[1000px]">
            <h1
              id="mapa-titulo"
              className="text-[30px] ml-2 md:ml-0 md:text-[50px] text-white font-bold"
            >
              {title}
            </h1>
            <div className="absolute w-[90vw] left-1/2 transform -translate-x-1/2 bg-white shadow-2xl rounded-[30px] p-5 mt-5">
              <strong className="text-[28px] text-black">{label}</strong>
              <form className="mt-10 flex flex-col md:flex-row gap-3">
                <div className="w-full">
                  <label className="font-semibold text-[16px]">
                    Estação Atual
                  </label>
                  <div className="relative mt-4">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">
                      <TrainFront />
                    </div>
                    <select
                      value={selectedStation}
                      onChange={(e) => setSelectedStation(e.target.value)}
                      className="w-full pl-12 py-5 bg-gray-100 rounded-[10px] border-none text-[20px]"
                    >
                      <option value="" disabled>
                        Selecione sua estação atual
                      </option>
                      {estacoes.map((estacao) => (
                        <option key={estacao.id} value={estacao.name}>
                          {estacao.name}{" "}
                          {nearestStation?.id === estacao.id
                            ? "(Mais próxima)"
                            : ""}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={getUserLocation}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full"
                      title="Usar localização atual"
                    >
                      <Locate size={20} />
                    </button>
                  </div>
                </div>
                <div className="w-full">
                  <label className="font-semibold text-[16px]">Destino</label>
                  <div className="relative mt-4">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">
                      <MapPin />
                    </div>
                    <select
                      ref={destinationRef}
                      value={destinationStation}
                      onChange={(e) => setDestinationStation(e.target.value)}
                      className="w-full pl-12 py-5 bg-gray-100 rounded-[10px] border-none text-[20px]"
                    >
                      <option value="" disabled>
                        Selecione a estação de destino
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

              {/* Mensagem de erro */}
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              {/* Exibição do próximo trem com dados reais da API */}
              {loading ? (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-lg">Buscando próximo trem...</p>
                </div>
              ) : transitInfo && minutesToArrival !== null ? (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Clock size={20} />
                    Próximo trem
                  </h3>

                  <div className="mt-4 flex items-center">
                    <div
                      className="w-3 h-12 rounded-l-md mr-3"
                      style={{
                        backgroundColor: transitInfo.line.color || "#333",
                      }}
                    ></div>
                    <div className="flex-1">
                      <div className="text-2xl font-bold">
                        {minutesToArrival} min
                      </div>
                      <div className="text-sm text-gray-500">
                        {transitInfo.line.name} ({transitInfo.line.short_name})
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-semibold">
                        {transitInfo.departureTime.text}
                      </div>
                      <div className="text-sm bg-gray-200 rounded-full px-2 py-1 inline-block mt-1">
                        {transitInfo.headsign}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-gray-500 flex justify-between">
                    <div>
                      Partida:{" "}
                      <span className="font-medium text-black">
                        {transitInfo.departureStop.name}
                      </span>
                    </div>
                    <div>
                      Chegada:{" "}
                      <span className="font-medium text-black">
                        {transitInfo.arrivalStop.name}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 text-sm">
                    <span className="text-gray-500">Paradas: </span>
                    <span className="font-medium">{transitInfo.numStops}</span>
                  </div>
                </div>
              ) : null}

              <div className="w-full flex justify-end">
                <button
                  onClick={handleSearch}
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
      </section>

      {isEstacoes && selectedStation && destinationStation && googleLoaded && (
        <div className="flex justify-center items-center h-screen">
          <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
            <Map style={{ width: "1200px", height: "500px" }} defaultZoom={12}>
              <Directions
                key={String(routeUpdated)}
                origin={selectedStation}
                destination={destinationStation}
                travelMode={google.maps.TravelMode.TRANSIT}
              />
            </Map>
          </APIProvider>
        </div>
      )}
    </>
  );
}
