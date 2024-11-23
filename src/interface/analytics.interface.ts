export interface AnalyticsAction {
  action: string;
  targetId: number;
  oldValue?: string;
  newValue?: string;
}
