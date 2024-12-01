export interface Lecturer {
  id: string;
  name: string;
  className: string;
  roomNumber: string;
  numberOfDays: number;
  checkInDate: string;
  admittingStaff: string;
}

export type LecturerFormData = Omit<Lecturer, 'id' | 'checkInDate'>;

export interface EditLecturerData {
  name: string;
  numberOfDays: number;
  roomNumber: string;
  admittingStaff: string;
}