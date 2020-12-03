import { MachineSkill } from "./../models/MachineSkill.model";
import { Maker } from "../models/maker.model";
import { Technician } from "../models/technician.model";

export class TempMachineSkillAssign {
  RelTechId :number = 0;
  Maker: Maker;
  MachineSkill: Array<MachineSkill>;
  Comment: string;
  SkillName: string;
  SkillNumber: number = 0;
  Technicians : Array<Technician>;
}
