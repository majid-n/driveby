import React, { useEffect, useState } from 'react';
import { Alert, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import storage from '@react-native-firebase/storage';
import Swipeable, { SwipeableAction } from '../../components/theme/Swipeable';
import { defaultStyles, spacing, theme } from '../../core/variables';
import { Product } from '../../screens/ProductsScreen';

interface Props {
  item: Product;
  onDelete: (id: string) => void;
}

const ProductItem = (props: Props) => {
  const [image, setImage] = useState('');
  const buttons: SwipeableAction[] = [
    { id: 'delete', text: 'Delete', icon: 'trash-2', side: 'right', color: '#dd2c00', fullRow: true },
    { id: 'archive', text: 'Archive', icon: 'plus', side: 'left', color: 'green', fullRow: false },
  ];

  useEffect(() => {
    if (props?.item?.image) getImage(props.item.image);
  }, []);

  const getImage = (name: string) => {
    storage()
      .ref('/' + name)
      .getDownloadURL()
      .then(response => {
        setImage(response);
      })
      .catch(error => setImage(''));
  };

  return (
    <Swipeable buttons={buttons} buttonWidth={80} onPress={text => props.onDelete(props.item.id)}>
      <RectButton style={styles.rectButton} onPress={() => Alert.alert(props.item.name)}>
        {!!image && (
          <View>
            <Image resizeMode="cover" style={{ width: 90, height: '100%' }} source={{ uri: image }} />
          </View>
        )}
        <View style={{ justifyContent: 'space-around', paddingLeft: 10 }}>
          <Text style={styles.fromText}>{props.item.name}</Text>
          <Text numberOfLines={2} style={styles.messageText}>
            {props.item.description}
          </Text>
        </View>
      </RectButton>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  rectButton: {
    flex: 1,
    height: 80,
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  fromText: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  messageText: {
    color: '#999',
  },
});

export default ProductItem;
