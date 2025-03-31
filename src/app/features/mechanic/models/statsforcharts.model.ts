export interface StatsResponse {
  success: boolean;
  data: { [key: string]: number }; // Map des services avec des valeurs numériques
}
