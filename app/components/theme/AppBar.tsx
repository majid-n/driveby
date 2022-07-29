import React, { memo } from 'react';
import { Appbar } from 'react-native-paper';

type Props = {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: AppbarAction[];
  onBack?: () => void;
  onPress?: (id: string) => void;
};
export type AppbarAction = {
  id: string;
  icon: string;
  size?: number;
  color?: string;
  side?: 'left' | 'right';
};

const AppBar = (props: Props) => {
  const right = (props.actions || []).filter(f => (f.side || 'right') === 'right');
  const left = (props.actions || []).filter(f => f.side === 'left');

  const createAction = (action: Omit<AppbarAction, 'side'>, index: number) => (
    <Appbar.Action
      key={`key${index}`}
      icon={action.icon || ''}
      size={action.size || 24}
      color={action.color}
      onPress={() => !!props.onPress && props.onPress(action.id)}
    />
  );

  return (
    <Appbar.Header theme={{ mode: 'adaptive' }}>
      {!!props.onBack && <Appbar.BackAction onPress={props.onBack} />}
      {!!left.length && left.map((m, i) => createAction(m, i))}
      {(!!props.title || !!props.subtitle) && <Appbar.Content title={props.title} subtitle={props.subtitle} />}
      {!!right.length && right.map((m, i) => createAction(m, i))}
    </Appbar.Header>
  );
};

export default memo(AppBar);
