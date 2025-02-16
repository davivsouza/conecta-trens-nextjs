import { Header } from "@/components/header";
import { LinhasForm } from "@/components/linhas-form";

export default function Estacoes() {
  return (
    <>
      <Header />
      <main>
        <LinhasForm title="Nossas Estações" label="Vai para onde?" isEstacoes />
      </main>
    </>
  );
}
