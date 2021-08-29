'use strict';
import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {Text, Image, FlatList, View} from 'react-native';

const StockMessage: () => Node = () => {
  const [photos, setPhotos] = useState([]);

  const getPhotos = async () => {
    fetch('https://arslogi.ca/photos.json')
      .then(response => response.json())
      .then(json => {
        console.log(json[0].constructor.name);
        console.log({}.constructor.name);
        console.log(json);
        setPhotos(json);
      });
  };
  useEffect(() => {
    getPhotos();
    return () => {
      console.log('called');
    };
  }, []);

  return (
    <FlatList
      data={photos}
      keyExtractor={photo => photo.url}
      renderItem={({item}) => (
        <Image
          resizeMode={'contain'}
          source={{uri: 'https://arslogi.ca' + item.url}}
          style={{height: 400, width: 400}}
        />
      )}
    />
  );
};

export default StockMessage;
