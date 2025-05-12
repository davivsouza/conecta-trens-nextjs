"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  CalendarIcon,
  Clock,
  CloudRain,
  PenToolIcon as Tool,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { OccupancyDisplay } from "@/components/occupancy-display";
import { predict } from "@/services/predict/predict";

// Define the form schema with validation
const formSchema = z.object({
  dia_semana: z.string().min(1, "Selecione o dia da semana"),
  hora: z.string().min(1, "Selecione a hora"),
  impacto_climatico: z.string().min(1, "Selecione a condição climática"),
  evento_simplificado: z.string().min(1, "Selecione o tipo de evento"),
});

// Define the days of the week
const diasDaSemana = [
  { value: "0", label: "Segunda-feira" },
  { value: "1", label: "Terça-feira" },
  { value: "2", label: "Quarta-feira" },
  { value: "3", label: "Quinta-feira" },
  { value: "4", label: "Sexta-feira" },
  { value: "5", label: "Sábado" },
  { value: "6", label: "Domingo" },
];

// Generate hours for the select input (0-23)
const horas = Array.from({ length: 24 }, (_, i) => ({
  value: i.toString(),
  label: `${i.toString().padStart(2, "0")}:00`,
}));

// Define weather conditions
const condicoesClimaticas = [
  { value: "0", label: "Ensolarado/Nublado" },
  { value: "1", label: "Chuvoso" },
  { value: "2", label: "Tempestade" },
];

// Define event types
const tiposDeEvento = [
  { value: "0", label: "Nenhum" },
  { value: "1", label: "Manutenção" },
];

export function OccupancyPredictionForm() {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dia_semana: "",
      hora: "",
      impacto_climatico: "",
      evento_simplificado: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setPrediction(null);

    try {
      // Convert string values to integers for the API
      const payload = {
        dia_semana: Number.parseInt(values.dia_semana),
        hora: Number.parseInt(values.hora),
        impacto_climatico: Number.parseInt(values.impacto_climatico),
        evento_simplificado: Number.parseInt(values.evento_simplificado),
      };

      const response = await predict(payload);

      setPrediction(response.predicao);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocorreu um erro ao processar sua solicitação"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Parâmetros de Previsão</CardTitle>
          <CardDescription>
            Preencha os campos abaixo para obter uma previsão de ocupação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="dia_semana"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dia da Semana</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Selecione o dia" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {diasDaSemana.map((dia) => (
                            <SelectItem key={dia.value} value={dia.value}>
                              {dia.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Dia da semana para a previsão
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hora"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hora</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <Clock className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Selecione a hora" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {horas.map((hora) => (
                            <SelectItem key={hora.value} value={hora.value}>
                              {hora.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Hora do dia (formato 24h)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="impacto_climatico"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condição Climática</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <CloudRain className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Selecione a condição" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {condicoesClimaticas.map((condicao) => (
                            <SelectItem
                              key={condicao.value}
                              value={condicao.value}
                            >
                              {condicao.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Condição climática prevista
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="evento_simplificado"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Evento</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <Tool className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Selecione o evento" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {tiposDeEvento.map((evento) => (
                            <SelectItem key={evento.value} value={evento.value}>
                              {evento.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Eventos programados no local
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Calculando..." : "Obter Previsão"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resultado da Previsão</CardTitle>
          <CardDescription>
            Nível de ocupação previsto com base nos parâmetros informados
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-[180px] w-full rounded-md" />
              <Skeleton className="h-4 w-3/4 rounded-md" />
              <Skeleton className="h-4 w-1/2 rounded-md" />
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : prediction !== null ? (
            <OccupancyDisplay value={prediction} />
          ) : (
            <div className="flex flex-col items-center justify-center h-[200px] text-center text-gray-500">
              <p>
                Preencha os parâmetros e clique em "Obter Previsão" para
                visualizar o resultado
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="text-sm text-gray-500">
          <p>Os resultados são baseados em dados históricos e podem variar.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
