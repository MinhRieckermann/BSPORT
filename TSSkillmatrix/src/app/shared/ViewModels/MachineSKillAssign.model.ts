import { MachineSkill } from './../models/MachineSkill.model';
import { Maker } from "../models/maker.model";

export class MachineSkillAssign{
    Maker: Maker;
    MachineSkill : Array<MachineSkill>
    Comment: string;
    SkillName:string;
    SkillNumber : number=0;
}