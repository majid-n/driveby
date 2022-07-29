import React, { useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import ImageResizer from 'react-native-image-resizer';

import { Add } from '../../core/crud';
import { nameValidator } from '../../core/utils';
import { Product } from '../../screens/ProductsScreen';
import { TextInput, Button as CButton } from '../theme';

interface Props {
  onCancel: () => void;
}

const ProductAdd = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState({ value: '', error: '' });
  const [description, setDescription] = useState({ value: '', error: '' });
  const [image, setImage] = useState({ value: { uri: '', name: '' }, error: '' });

  useEffect(() => setIsLoading(false), []);

  const chooseFile = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel) setImage({ value: { uri: '', name: '' }, error: 'User cancelled image picker' });
      else if (response.errorMessage)
        setImage({
          value: { uri: '', name: '' },
          error: 'ImagePicker Error: ' + response.errorMessage,
        });
      else {
        const paths = (response.assets || [])?.map(asset => asset.uri || '');
        ImageResizer?.createResizedImage(paths[0], 200, 200, 'PNG', 80, undefined, undefined, false, { mode: 'cover' })
          .then(res => setImage({ value: { uri: res.uri, name: res.name }, error: '' }))
          .catch(err => setImage({ value: { uri: '', name: '' }, error: 'Error resizing picture' }));
      }
    });
  };

  const addProduct = async () => {
    const nameError = nameValidator(name.value);

    if (nameError) {
      setName({ ...name, error: nameError });
      return;
    }

    const uri = Platform.OS === 'ios' ? image.value.uri.replace('file://', '') : image.value.uri;
    const uploadedImage = await storage().ref(`product-${image.value.name}`).putFile(uri);

    setIsLoading(true);
    Add<Product>('Products', {
      name: name.value,
      description: description.value,
      image: uploadedImage?.metadata?.fullPath || '',
    })
      .then(() => {
        props.onCancel();
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <View>
      <TextInput
        label="Name"
        autoFocus={true}
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />

      <TextInput
        label="Description"
        returnKeyType="next"
        multiline={true}
        numberOfLines={2}
        value={description.value}
        onChangeText={text => setDescription({ value: text, error: '' })}
        error={!!description.error}
        errorText={description.error}
      />

      {!!image.value.uri && <Image source={{ uri: image.value.uri, width: 100, height: 100 }} />}
      {/* <CButton
        icon="camera"
        onPress={() => {
          launchCamera({ mediaType: 'photo' }, aaa => {
            console.log(aaa);
          });
        }}
        children="Take Picture"
      /> */}
      <CButton
        icon="image"
        children="Pick Image"
        onPress={() => {
          chooseFile();
        }}
      />

      <View style={styles.buttonContainer}>
        <Button loading={isLoading} mode="contained" onPress={addProduct}>
          Save
        </Button>
        <Button mode="text" onPress={props.onCancel}>
          Cancel
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row-reverse',
  },
});

export default ProductAdd;
