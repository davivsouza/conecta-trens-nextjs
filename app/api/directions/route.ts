import { NextRequest, NextResponse } from 'next/server';

// Sua API key deve estar em variáveis de ambiente

export async function GET(req: NextRequest) {
  try {
    // Extrair parâmetros da URL
    const searchParams = req.nextUrl.searchParams;
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');
    const waypoints = searchParams.get('waypoints');

    // Validar parâmetros obrigatórios
    if (!origin || !destination) {
      return NextResponse.json(
        { error: 'Origem e destino são obrigatórios' },
        { status: 400 }
      );
    }

    // Construir URL para a API do Google Maps
    let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}&mode=transit&language=pt_BR`;
    
    // Adicionar waypoints se fornecidos
    if (waypoints) {
      url += `&waypoints=${encodeURIComponent(waypoints)}`;
    }

    // Fazer requisição para a API do Google Maps
    const response = await fetch(url);
    const data = await response.json();

    // Retornar os dados para o cliente
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro ao buscar direções:', error);
    return NextResponse.json(
      { error: 'Erro ao processar solicitação' },
      { status: 500 }
    );
  }
}

// Opcional: se você estiver usando o Next.js 13/14 com App Router, precisa exportar também:
export const dynamic = 'force-dynamic'; // Garante