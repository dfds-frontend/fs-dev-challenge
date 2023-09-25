export interface ICreateVoyage {
  data: {
    portOfLoading: string;
    portOfDischarge: string;
    vesselId: string;
    scheduledDeparture: string;
    scheduledArrival: string;
  };
}

export interface ICreateUnit {
  data: {
    type: string;
    length: string;
    registrationNumber: string;
    voyageId: string;
  };
}

export interface IVessel {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUnit {
  id: string;
  voyageId: string;
  type: string;
  length: string;
  registrationNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVoyage {
  id: string;
  portOfLoading: string;
  portOfDischarge: string;
  vesselId: string;
  scheduledDeparture: Date;
  scheduledArrival: Date;
  createdAt: Date;
  updatedAt: Date;
  vessel: IVessel;
  units: IUnit[] | [];
}
