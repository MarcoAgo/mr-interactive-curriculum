export interface TSkillItem {
  label: string;
  basic?: boolean;
}

export interface TSkillGroup {
  title: string;
  items: TSkillItem[];
}
