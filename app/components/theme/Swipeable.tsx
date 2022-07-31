import React, { Fragment } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { RectButton, Swipeable as SWP } from 'react-native-gesture-handler';
import Icon from './Icon';

interface Props extends React.ComponentProps<any> {
  // TODO: add modes
  modes?: (keyof Mode)[];
  buttons?: SwipeableAction[];
  onPress?: (id: string) => void;
  buttonWidth?: number;
  SwipeableProps?: { [name: string]: any };
}

const Swipeable = (mainProps: Props) => {
  let _swipeableRow: SWP;
  const updateRef = ref => (_swipeableRow = ref);
  const btnPressed = (id: string) => {
    _swipeableRow.close();
    mainProps.onPress && typeof mainProps.onPress === 'function' && mainProps.onPress(id);
  };

  const CreateRectButton = (props: SwipeableAction) => {
    return (
      <RectButton style={[styles.action, { backgroundColor: props.color }]} onPress={() => btnPressed(props.id)}>
        {props.icon && <Icon style={styles.actionText} name={props.icon} />}
        {props.text && <Text style={styles.actionText}>{props.text}</Text>}
      </RectButton>
    );
  };
  const renderAction = (props: RenderActionProps, index: number) => {
    const trans = props.progress.interpolate({
      inputRange: props.fullRow ? [0, 50, 100, 101] : [0, 1],
      outputRange: props.fullRow ? [-20, 0, 0, 1] : [index * (mainProps.buttonWidth || 70), 0],
    });
    const rectBtn = <CreateRectButton {...props} color={props.color || '#ccc'} />;
    return (
      <Fragment key={`key${index}`}>
        {true ? <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>{rectBtn}</Animated.View> : rectBtn}
      </Fragment>
    );
  };

  const getButtons = (side: 'left' | 'right') => {
    const items = (mainProps.buttons || []).filter(f => (f.side || 'right') === side);
    const fullRow = items.find(item => item.fullRow);
    return { fullRow, items, count: fullRow ? 1 : items.length };
  };
  const createActions = (side: 'left' | 'right', progress, dragX) => {
    const { items, fullRow } = getButtons(side);

    return fullRow ? (
      renderAction({ ...fullRow, progress }, 0)
    ) : (
      <View style={{ width: items.length * (mainProps.buttonWidth || 70), flexDirection: 'row' }}>
        {items.map((btn, i) => renderAction({ ...btn, progress }, i))}
      </View>
    );
  };

  return (
    <SWP
      ref={updateRef}
      friction={2}
      leftThreshold={30}
      rightThreshold={40}
      {...mainProps.SwipeableProps}
      {...(getButtons('left').count && {
        renderLeftActions: (progress, dragX) => createActions('left', progress, dragX),
      })}
      {...(getButtons('right').count && {
        renderRightActions: (progress, dragX) => createActions('right', progress, dragX),
      })}>
      {mainProps.children}
    </SWP>
  );
};

const styles = StyleSheet.create({
  action: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
});

interface Mode {
  deleteLeft;
  deleteRight;
  editLeft;
  editRight;
}
export type SwipeableAction = {
  id: string;
  text: string;
  color?: string;
  icon?: string;
  side?: 'left' | 'right';
  fullRow?: boolean;
};
type RenderActionProps = SwipeableAction & {
  progress: any;
};

export default Swipeable;
