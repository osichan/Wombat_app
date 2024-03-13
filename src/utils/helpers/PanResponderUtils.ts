import { Dispatch, useState } from "react";
import { Animated, PanResponder } from "react-native";

export function usePanResponder(
  setIsConfirmationVisible: Dispatch<React.SetStateAction<boolean>>
) {
  const [hasMovedLeft, setHasMovedLeft] = useState(false);
  const pan = useState(new Animated.ValueXY())[0];

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponderCapture: (_, gestureState) => {
      return gestureState.dx < 0;
    },
    onPanResponderMove: (_, gestureState) => {
      if (!hasMovedLeft && gestureState.dx < -30) {
        setHasMovedLeft(true);
      }
      if (hasMovedLeft) {
        pan.setValue({ x: gestureState.dx, y: 0 });
      }
    },
    onPanResponderRelease: async (e, gestureState) => {
      if (hasMovedLeft) {
        if (gestureState.dx < -90) {
          setIsConfirmationVisible(true); // You'll need to pass this function or state from RoleDeleteComponent
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      }
      setHasMovedLeft(false);
    },
  });

  return { pan, panResponder };
}
