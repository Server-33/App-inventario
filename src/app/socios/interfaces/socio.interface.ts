export interface Socio extends SocioForm {
  id: string;
}

export interface SocioForm {
  name: string;
  title: string;
  subtitle?: string;
  coment?: string;
  description?: string;
  social?: Social[];
  acordion?: Acordion[];
  services?: Services[];
}

export interface Acordion {
  title: string;
  content: string;
}

export interface Services {
  title: string;
  content: string;
}
export interface Social {
  title: string;
  content: string;
}
