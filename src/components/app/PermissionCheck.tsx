import React from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../redux/reducers/userInfoReducer";

type PermissionCheckProps = {
  children: React.ReactNode;
  permissionsToBeVisible: number[];
  elseChildren?: React.ReactNode;
};

export default function PermissionCheck({
  children,
  permissionsToBeVisible,
  elseChildren,
}: PermissionCheckProps) {
  const userPermissions = useSelector(selectUserInfo)?.permissionIds;
  const areAllNumbersInFirstArray = () => {
    for (const number of permissionsToBeVisible) {
      if (userPermissions?.includes(number)) {
        return true;
      }
    }
    return false;
  };
  if (areAllNumbersInFirstArray()) {
    return <>{children}</>;
  }
  return elseChildren ? elseChildren : null;
}
