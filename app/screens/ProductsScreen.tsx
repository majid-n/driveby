import React, { Fragment, useEffect, useState } from 'react';
import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { ProductAdd, ProductItem } from '../components/pages';
import { AppBar, Modal } from '../components/theme';
import { DrawerNavProps } from '../core/types';
import { Delete, Get } from '../core/crud';

const ProductsScreen = ({ navigation }: DrawerNavProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    getProducts();
  }, []);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const onAppbarPress = id =>
    ({
      add: showModal,
      menu: navigation.toggleDrawer,
    }[id]());
  const getProducts = () => {
    setIsLoading(true);
    Get<Product>('Products').then(result => {
      setProducts(result);
      setIsLoading(false);
    });
  };
  const deleteProduct = (id: string) => {
    setIsLoading(true);
    Delete('Products', id);
    getProducts();
  };

  return (
    <Fragment>
      <AppBar
        title="Products"
        // subtitle="products description"
        onPress={onAppbarPress}
        actions={[
          { id: 'add', icon: 'plus' },
          { id: 'menu', icon: 'menu', side: 'left' },
        ]}
      />
      <Modal visible={modalVisible} onDismiss={hideModal}>
        <ProductAdd onCancel={hideModal} />
      </Modal>

      <SafeAreaView style={styles.container}>
        {isLoading && <ActivityIndicator animating={true} />}

        <FlatList
          data={products}
          style={{ padding: 15 }}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => <ProductItem item={item} onDelete={deleteProduct} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
});

export interface Product {
  id: string;
  name: string;
  description: string;
  image: any;
}

export default ProductsScreen;
