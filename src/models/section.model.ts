export interface SectionModel {
  id: number;
  name: string;
  page: number;
  subs: SectionModel[];
}
