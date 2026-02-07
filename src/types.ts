export interface User {
  id: number;
  name: string;
  email: string;
  phone_number: string | '';
}

export interface Education {
  Heighets_degree: string;
  institute_name: string;
  graduation_year: string;
}

export interface Career {
  profession: string;
  job_title: string;
  company: string;
  annual_income: string;
}

export interface FamilyDetail {
  father_name: string;
  father_occupation: string;
  mother_name: string;
  mother_occupation: string;
  brothers_unmarried: number;
  brothers_married: number;
  sisters_unmarried: number;
  sisters_married: number;
  family_details: string | null;
}

export interface Location {
  present_address: string;
  city: string | null;
  nationality: string | null;
  residence_status: string | null;
}

export interface Lifestyle {
  diet: string;
  smoking: string;
  drinking: string;
  hobbies: string | null;
}

export interface PartnerPreference {
  preferred_age_min: number | null;
  preferred_age_max: number | null;
  preferred_religion: string | null;
  preferred_education: string | null;
  preferred_country: string | null;
}

export interface Photo {
  id: number;
  url: string;
  is_primary: boolean;
}

export interface ProfileData {
  id: number;
  user_id: number;
  profile_id: number;
  gender: string;
  dob: string;
  religion: string;
  bio: string;
  marital_status: string;
  user: User;
  education: Education | null;
  career: Career | null;
  family_detail: FamilyDetail | null;
  location: Location | null;
  lifestyle: Lifestyle | null;
  partner_preference: PartnerPreference | null;
  photos: Photo[];
}



// export interface Message {
//   sender: "me" | "them";
//   text: string;
//   time: string;
// }

export interface Message {
  sender: "me" | "them";
  text: string;
  time: string;
  tempId?: string; // For optimistic updates
  failed?: boolean; // For error states
}

export interface ChatItem {
  id: number;
  name: string;
  lastMsg: string;
  image: string;
  timeOrDate: string;
  isActive: boolean;
  userId: number;
}
