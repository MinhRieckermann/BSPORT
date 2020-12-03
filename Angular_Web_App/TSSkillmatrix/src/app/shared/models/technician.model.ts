import { ProfessionalSkill } from "./ProfessionalSkill.model";
import { MachineSkillAssign } from "./../ViewModels/MachineSKillAssign.model";
export class Technician {
  TechId: number = 0;
  UserName: string;
  DisplayName: string;
  EmailAddress: string;
  Title: string;
  Initials: string;
  ProSkill: number;
  StationId: number;
  Remark: string;
  IndustryId: number;
  CreatedBy: number;
  UpdatedBy: number;
  listAssign: Array<MachineSkillAssign>;
  IndustryName: string;
  StationName: string;
  SkillsName: string;
  ProskillName: string;
  CanEdit: boolean = false;
  Professionals: Array<ProfessionalSkill>;
  Deactive : boolean = false;
  IsFirstTime : boolean = true;
}
