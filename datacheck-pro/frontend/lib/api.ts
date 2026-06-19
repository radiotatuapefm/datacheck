const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api/v1";

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {})
    },
    cache: "no-store"
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Erro de API");
  }
  return response.json() as Promise<T>;
}

export type DashboardOverview = {
  user: {
    name: string;
    email: string;
    credits: number;
    termsAccepted: boolean;
  };
  stats: {
    totalConsultations: number;
    creditsAvailable: number;
    favorites: number;
    exportedReports: number;
  };
  notifications: Array<{ id: string; title: string; message: string; createdAt: string }>;
  recentConsultations: Array<{ id: string; module: string; riskScore: number; createdAt: string }>;
};
