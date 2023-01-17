import React, {useEffect, useState} from 'react';
import {Platform, View} from 'react-native';
import {FlatList, StyleSheet, Text, Image} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {SearchBarBaseProps} from 'react-native-elements/dist/searchbar/SearchBar';

export const Home = () => {
  const [articles, setArticles] = useState();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchArticles = () => {
      fetch(
        `https://newsapi.org/v2/everything?q=${searchText}&apiKey=183daca270264bad86fc5b72972fb82a`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      ).then(async result => {
        const response = await result.text();
        setArticles(JSON.parse(response).articles);
      });
    };
    fetchArticles();
  }, [searchText]);

  const SafeSearchBar = SearchBar as unknown as React.FC<SearchBarBaseProps>;
  return (
    <>
      <SafeSearchBar
        placeholder="Type Here..."
        platform={Platform.OS as 'ios' | 'android' | 'default'}
        onChangeText={text => setSearchText(text)}
        value={searchText}
      />
      <FlatList
        data={articles}
        renderItem={({item}) => (
          <View style={styles.item}>
            {item.urlToImage && (
              <Image
                source={{
                  uri: item.urlToImage,
                }}
                style={styles.image}
              />
            )}
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
      />
    </>
  );
};
const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
  },
  image: {
    flex: 1,
    height: 100,
  },
});
