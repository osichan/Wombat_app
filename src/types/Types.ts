export type WarehouseProps = {
  [x: string]: any;
  id: number;
  name: string;
  address: string;
  description: string;
};

export type UserInfoProps = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: string;
  description: string | null;
  isLoaned: boolean;
  isStaff: boolean;
  isSuperuser: boolean;
  telegramId: number | null;
  permissionIds: number[];
};

export type PermissionsProps = {
  id: number;
  name: string;
};

export type RoleProps = {
  id: number;
  name: string;
  permissions: number[];
};

export type SpecialStatusProps = {
  information: string;
  id: number;
};

export type PersonProps = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: string;
  isLoaned: boolean;
};

export type SupplyCategoryProps = {
  id: number;
  name: string;
  type: "C" | "T";
  description: string;
};

export type SupplyProps = {
  id: number;
  name: string;
  description: string;
  category: string;

  currentlyAt: CurrentlyAtProps;
  article?: string;

  unitQuantity?: number;
  measuredBy?: string;
};

export type ToolProps = {
  id: number;
  name: string;
  article: string;
  description: string;
  category: string;
  warehouse?: string;
  currentlyAt: CurrentlyAtProps;
};

export type ProjectProps = {
  id: number;
  name: string;
  address: string;
  manager: { fullName: string; id: number };
  notes: string;
  isActive: boolean;
  client: { fullName: string; id: number } | null;
};

export type ProjectTaskProps = {
  id: number;
  name: string;
  description: string;
  taskStatus: "A" | "O" | "D";
  showToClient: boolean;
};

export type ToolHistoryProps = {
  id: number;
  causedBy: string;
  timestamp: string;
  relatedObject: {
    name: string;
    currentlyAt: CurrentlyAtProps;
  };
  status: "Взято" | "Додано" | "Повернено" | "Витрачено";
};

export type ConsumableHistoryProps = {
  id: number;
  causedBy: string;
  timestamp: string;
  relatedObject: {
    name: string;
    currentlyAt: CurrentlyAtProps;
    unitQuantity: number;
  };
  status: "Взято" | "Додано" | "Повернено" | "Витрачено";
};

export type BrigadeProps = {
  id: number;
  name: string;
  description: string;
  foreman: {
    id: number;
    fullName: string;
  };
  staff: { id: number; fullName: string }[];
};

export type ConsumableProps = {
  id: number;
  name: string;
  description: string;
  unitQuantity: number;
  measuredBy: string;
  category: string;
  currentlyAt: CurrentlyAtProps;
};

export type ConsumableUnitProps = {
  id: number;
  name: string;
  category: string;
  measuredBy: string;
  description: string;
};

export type CurrentlyAtProps =
  | {
      data: string;
      type: "WH" | "SS";
    }
  | {
      data: {
        owner: {
          id: number;
          name: string;
        };
        project: {
          id: number;
          name: string;
        };
      };
      type: "OP";
    };

export type MeasurementUnitProps = {
  id: number;
  name: string;
};
