"use client";

import { VLibrasComponent } from "@/components/vlibras";
import { VoiceNavigator } from "@/components/voice-navigator";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthContextProvider>{children}</AuthContextProvider>
      <VoiceNavigator />
      <VLibrasComponent />
      <Toaster richColors />
    </>
  );
}
